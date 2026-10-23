const MAIL_DOMAIN = "mail.hmdevelop.me";
const RETENTION_MS = 60 * 60 * 1000;
const MAX_BODY_BYTES = 2_000_000;
const MAX_STORED_BODY = 48_000;
const CREATE_LIMIT = 8;
const LIMIT_WINDOW_MS = 60 * 60 * 1000;

const bytesToB64Url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
const hex = (bytes) => [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, "0")).join("");
const randomHex = (size) => hex(crypto.getRandomValues(new Uint8Array(size)));
const sha256 = async (value) => hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));
const json = (body, status = 200, extra = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
});

function cors(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = new Set([env.ALLOWED_ORIGIN, "https://mail.hmdevelop.me", "https://temp.hmdevelop.me"]);
  if (!allowedOrigins.has(origin)) return null;
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
    "access-control-allow-headers": "Authorization, Content-Type",
    "access-control-max-age": "600",
    "vary": "Origin",
  };
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function verifyResendWebhook(request, rawBody, secret) {
  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signatures = request.headers.get("svix-signature");
  if (!id || !timestamp || !signatures || !secret) return false;
  const seconds = Number(timestamp);
  if (!Number.isFinite(seconds) || Math.abs(Date.now() / 1000 - seconds) > 300) return false;
  let keyBytes;
  try {
    const encoded = secret.startsWith("whsec_") ? secret.slice(6) : secret;
    const binary = atob(encoded);
    keyBytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  } catch { return false; }
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = `${id}.${timestamp}.${rawBody}`;
  const signature = bytesToB64Url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signed)))
    .replace(/-/g, "+").replace(/_/g, "/");
  const padded = signature + "=".repeat((4 - signature.length % 4) % 4);
  return signatures.split(" ").some((part) => {
    const [version, value] = part.split(",", 2);
    return version === "v1" && !!value && constantTimeEqual(value, padded);
  });
}

async function cleanup(db) {
  const now = Date.now();
  await db.batch([
    db.prepare("DELETE FROM messages WHERE expires_at <= ?").bind(now),
    db.prepare("DELETE FROM inboxes WHERE expires_at <= ?").bind(now),
    db.prepare("DELETE FROM create_limits WHERE window_start + ? <= ?").bind(LIMIT_WINDOW_MS, now),
  ]);
}

async function createInbox(request, env, headers) {
  if (!env.DB || !env.RESEND_API_KEY || !env.RESEND_WEBHOOK_SECRET) {
    return json({ error: "SERVICE_SETUP_INCOMPLETE" }, 503, headers);
  }
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const ipHash = await sha256(`${env.RESEND_API_KEY}:${ip}`);
  const now = Date.now();
  const limit = await env.DB.prepare(`
    INSERT INTO create_limits (ip_hash, window_start, count) VALUES (?, ?, 1)
    ON CONFLICT(ip_hash) DO UPDATE SET
      count = CASE WHEN create_limits.window_start + ? <= ? THEN 1 ELSE create_limits.count + 1 END,
      window_start = CASE WHEN create_limits.window_start + ? <= ? THEN ? ELSE create_limits.window_start END
    RETURNING count
  `).bind(ipHash, now, LIMIT_WINDOW_MS, now, LIMIT_WINDOW_MS, now, now).first();
  if (!limit || limit.count > CREATE_LIMIT) return json({ error: "RATE_LIMITED" }, 429, headers);

  const address = `dn-${randomHex(12)}@${MAIL_DOMAIN}`;
  const token = bytesToB64Url(crypto.getRandomValues(new Uint8Array(32)));
  const tokenHash = await sha256(token);
  const expiresAt = now + RETENTION_MS;
  await env.DB.prepare("INSERT INTO inboxes (address, token_hash, created_at, expires_at) VALUES (?, ?, ?, ?)")
    .bind(address, tokenHash, now, expiresAt).run();
  return json({ address, token, expiresAt }, 201, headers);
}

async function readInbox(request, env, headers) {
  if (!env.DB) return json({ error: "SERVICE_SETUP_INCOMPLETE" }, 503, headers);
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token || token.length > 256) return json({ error: "UNAUTHORIZED" }, 401, headers);
  const tokenHash = await sha256(token);
  const inbox = await env.DB.prepare("SELECT address, expires_at FROM inboxes WHERE token_hash = ? AND expires_at > ?")
    .bind(tokenHash, Date.now()).first();
  if (!inbox) return json({ error: "INBOX_EXPIRED" }, 404, headers);
  const messages = await env.DB.prepare(`
    SELECT id, from_address AS sender, subject, text_body AS text, html_body AS html,
      attachment_count AS attachmentCount, received_at AS receivedAt
    FROM messages WHERE address = ? AND expires_at > ? ORDER BY received_at DESC LIMIT 30
  `).bind(inbox.address, Date.now()).all();
  return json({ address: inbox.address, expiresAt: inbox.expires_at, messages: messages.results || [] }, 200, headers);
}

async function deleteInbox(request, env, headers) {
  if (!env.DB) return json({ error: "SERVICE_SETUP_INCOMPLETE" }, 503, headers);
  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token || token.length > 256) return json({ error: "UNAUTHORIZED" }, 401, headers);
  const tokenHash = await sha256(token);
  const inbox = await env.DB.prepare("SELECT address FROM inboxes WHERE token_hash = ?").bind(tokenHash).first();
  if (!inbox) return json({ error: "INBOX_EXPIRED" }, 404, headers);
  await env.DB.batch([
    env.DB.prepare("DELETE FROM messages WHERE address = ?").bind(inbox.address),
    env.DB.prepare("DELETE FROM inboxes WHERE token_hash = ?").bind(tokenHash),
  ]);
  return json({ deleted: true }, 200, headers);
}

async function handleResendWebhook(request, env) {
  if (!env.DB || !env.RESEND_API_KEY || !env.RESEND_WEBHOOK_SECRET) return json({ error: "NOT_READY" }, 503);
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return json({ error: "PAYLOAD_TOO_LARGE" }, 413);
  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) return json({ error: "PAYLOAD_TOO_LARGE" }, 413);
  if (!await verifyResendWebhook(request, rawBody, env.RESEND_WEBHOOK_SECRET)) return json({ error: "INVALID_SIGNATURE" }, 401);
  let event;
  try { event = JSON.parse(rawBody); } catch { return json({ error: "INVALID_JSON" }, 400); }
  if (event.type !== "email.received") return json({ ok: true });

  const emailId = event.data?.email_id;
  if (!emailId || typeof emailId !== "string") return json({ error: "MISSING_EMAIL_ID" }, 400);
  const response = await fetch(`https://api.resend.com/emails/receiving/${encodeURIComponent(emailId)}`, {
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, accept: "application/json" },
  });
  if (!response.ok) return json({ error: "RESEND_READ_FAILED" }, 502);
  const payload = await response.json();
  const mail = payload.data || payload;
  const candidates = [...(event.data?.to || []), ...(event.data?.received_for || []), ...(mail.to || [])]
    .filter((value) => typeof value === "string")
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value.endsWith(`@${MAIL_DOMAIN}`));
  if (!candidates.length) return json({ ok: true, ignored: true });

  const now = Date.now();
  await cleanup(env.DB);
  const maxText = (value) => typeof value === "string" ? value.slice(0, MAX_STORED_BODY) : "";
  for (const address of new Set(candidates)) {
    const inbox = await env.DB.prepare("SELECT expires_at FROM inboxes WHERE address = ? AND expires_at > ?")
      .bind(address, now).first();
    if (!inbox) continue;
    await env.DB.prepare(`
      INSERT OR IGNORE INTO messages
        (id, address, from_address, subject, text_body, html_body, attachment_count, received_at, expires_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      emailId, address, maxText(mail.from || event.data?.from).slice(0, 320),
      maxText(mail.subject || event.data?.subject).slice(0, 500),
      maxText(mail.text), maxText(mail.html),
      Array.isArray(event.data?.attachments) ? event.data.attachments.length : 0,
      now, Math.min(Number(inbox.expires_at), now + RETENTION_MS),
    ).run();
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true, configured: !!(env.DB && env.RESEND_API_KEY && env.RESEND_WEBHOOK_SECRET) });
    }
    if (url.pathname === "/webhooks/resend" && request.method === "POST") return handleResendWebhook(request, env);

    const headers = cors(request, env);
    if (!headers) return json({ error: "ORIGIN_NOT_ALLOWED" }, 403);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (url.pathname === "/api/inboxes" && request.method === "POST") return createInbox(request, env, headers);
    if (url.pathname === "/api/inbox" && request.method === "GET") return readInbox(request, env, headers);
    if (url.pathname === "/api/inbox" && request.method === "DELETE") return deleteInbox(request, env, headers);
    return json({ error: "NOT_FOUND" }, 404, headers);
  },

  async scheduled(_event, env, ctx) {
    if (env.DB) ctx.waitUntil(cleanup(env.DB));
  },
};
