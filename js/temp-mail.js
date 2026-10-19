import { getLang } from "./i18n.js";
import { getMailCopy } from "./mail-copy.js";

const SESSION_KEY = "dounest.temp-mail.session.v1";
let timers = [];

function clearTimers() {
  for (const timer of timers) clearInterval(timer);
  timers = [];
}

function make(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = String(text);
  return el;
}

function readSession() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    if (!saved || typeof saved.address !== "string" || !/^dn-[a-f0-9]{24}@mail\.hmdevelop\.me$/i.test(saved.address)
      || typeof saved.token !== "string" || saved.token.length < 30 || !Number.isFinite(Number(saved.expiresAt))
      || Number(saved.expiresAt) <= Date.now()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return { address: saved.address, token: saved.token, expiresAt: Number(saved.expiresAt) };
  } catch {
    return null;
  }
}

function saveSession(value) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(value)); }
  catch { /* An active inbox still works in memory if session storage is unavailable. */ }
}

function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* storage may be blocked */ }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function pageMarkup(copy) {
  return `
    <section class="page-head mail-page-head">
      <p class="eyebrow">✉ ${escapeHtml(copy.nav)}</p>
      <h1>${escapeHtml(copy.title)}</h1>
      <p class="lead">${escapeHtml(copy.intro)}</p>
    </section>
    <section class="workspace mail-workspace" id="mail-service-root">
      <div class="mail-card">
        <div class="mail-create-row">
          <button class="btn btn-primary" id="mail-create" type="button">${escapeHtml(copy.create)}</button>
          <p class="mail-status" id="mail-status" role="status" aria-live="polite">${escapeHtml(copy.statusIdle)}</p>
        </div>
        <div id="mail-active" hidden>
          <label class="mail-label" for="mail-address">${escapeHtml(copy.addressLabel)}</label>
          <div class="mail-address-line">
            <input class="mail-address" id="mail-address" type="text" readonly autocomplete="off" spellcheck="false" placeholder="${escapeHtml(copy.addressPlaceholder)}">
            <button class="btn btn-secondary" id="mail-copy" type="button">${escapeHtml(copy.copy)}</button>
          </div>
          <div class="mail-toolbar">
            <p class="mail-expiry" id="mail-expiry" aria-live="polite"></p>
            <div class="mail-toolbar-actions">
              <button class="btn btn-secondary" id="mail-refresh" type="button">${escapeHtml(copy.refresh)}</button>
              <button class="btn btn-danger" id="mail-delete" type="button">${escapeHtml(copy.delete)}</button>
            </div>
          </div>
          <section class="mail-messages" aria-labelledby="mail-inbox-title">
            <h2 id="mail-inbox-title">${escapeHtml(copy.inboxTitle)} <span id="mail-count"></span></h2>
            <p class="mail-empty" id="mail-empty">${escapeHtml(copy.noMessages)}</p>
            <div class="mail-message-list" id="mail-message-list"></div>
          </section>
          <p class="mail-session-note">${escapeHtml(copy.sessionNote)}</p>
        </div>
        <aside class="mail-warning" aria-labelledby="mail-warning-title">
          <h2 id="mail-warning-title">${escapeHtml(copy.warningTitle)}</h2>
          <p>${escapeHtml(copy.warning)}</p>
        </aside>
      </div>
    </section>
    <article class="hub-guide mail-guide">
      <h2>${escapeHtml(copy.guideTitle)}</h2>
      <ol class="hub-steps">${copy.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      <section class="hub-faq mail-faq">
        <h2>${escapeHtml(copy.faqTitle)}</h2>
        ${copy.faqs.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}
      </section>
    </article>`;
}

export function render(main) {
  clearTimers();
  const copy = getMailCopy(getLang());
  main.innerHTML = pageMarkup(copy);

  const root = main.querySelector("#mail-service-root");
  const createButton = root.querySelector("#mail-create");
  const activePanel = root.querySelector("#mail-active");
  const addressInput = root.querySelector("#mail-address");
  const status = root.querySelector("#mail-status");
  const expiry = root.querySelector("#mail-expiry");
  const list = root.querySelector("#mail-message-list");
  const empty = root.querySelector("#mail-empty");
  const count = root.querySelector("#mail-count");
  const apiBase = String(window.DouNestConfig?.tempMailApi || "").replace(/\/+$/, "");
  let inbox = readSession();
  let busy = false;
  let refreshing = false;

  const setStatus = (message) => { status.textContent = message; };
  const setBusy = (value) => {
    busy = value;
    root.setAttribute("aria-busy", value ? "true" : "false");
    for (const button of root.querySelectorAll("button")) button.disabled = value;
  };
  const request = async (path, { method = "GET", token, body } = {}) => {
    if (!apiBase) throw Object.assign(new Error("SERVICE_SETUP_INCOMPLETE"), { code: "SERVICE_SETUP_INCOMPLETE" });
    const headers = new Headers();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    if (body !== undefined) headers.set("Content-Type", "application/json");
    let response;
    try {
      response = await fetch(`${apiBase}${path}`, {
        method, headers, body: body === undefined ? undefined : JSON.stringify(body),
        cache: "no-store", credentials: "omit", redirect: "error"
      });
    } catch (error) {
      if (error?.name === "TypeError" || error?.name === "AbortError") throw Object.assign(error, { code: "NETWORK" });
      throw error;
    }
    let payload = {};
    try { payload = await response.json(); } catch { /* show a generic error below */ }
    if (!response.ok) throw Object.assign(new Error(payload.error || `HTTP_${response.status}`), { status: response.status, code: payload.error || "HTTP_ERROR" });
    return payload;
  };

  const showInbox = () => {
    const visible = Boolean(inbox);
    activePanel.hidden = !visible;
    createButton.hidden = visible;
    if (visible) addressInput.value = inbox.address;
  };

  const updateExpiry = () => {
    if (!inbox || !root.isConnected) return;
    const seconds = Math.max(0, Math.ceil((inbox.expiresAt - Date.now()) / 1000));
    if (seconds <= 0) {
      inbox = null;
      clearTimers();
      clearSession();
      showInbox();
      expiry.textContent = copy.expired;
      setStatus(copy.statusExpired);
      list.replaceChildren();
      empty.hidden = false;
      return;
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const clock = hours ? `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}` : `${minutes}:${String(secs).padStart(2, "0")}`;
    expiry.textContent = copy.expiresIn.replace("{time}", clock);
  };

  const renderMessages = (messages) => {
    const safeMessages = Array.isArray(messages) ? messages.slice(0, 30) : [];
    count.textContent = safeMessages.length ? `(${safeMessages.length})` : "";
    empty.hidden = safeMessages.length > 0;
    list.replaceChildren();
    for (const message of safeMessages) {
      const details = make("details", "mail-message");
      const summary = make("summary", "mail-message-summary");
      const subject = make("span", "mail-message-subject", message?.subject || "(no subject)");
      const sender = make("span", "mail-message-sender", `${copy.sender}: ${String(message?.sender || "unknown")}`);
      summary.append(subject, sender);
      const body = make("div", "mail-message-content");
      const receivedAt = Number(message?.receivedAt);
      const dateText = Number.isFinite(receivedAt) ? new Date(receivedAt).toLocaleString(getLang()) : "";
      const date = make("p", "mail-message-meta", `${copy.received}: ${dateText}`);
      body.append(date);
      const attachmentCount = Number(message?.attachmentCount);
      if (Number.isFinite(attachmentCount) && attachmentCount > 0) body.append(make("p", "mail-message-meta", `${attachmentCount} ${copy.attachments}`));
      const plainText = typeof message?.text === "string" ? message.text : "";
      body.append(make("pre", "mail-message-body", plainText || copy.noPlainText));
      details.append(summary, body);
      list.append(details);
    }
  };

  const displayError = (error) => {
    if (error?.status === 429 || error?.code === "RATE_LIMITED") return copy.statusLimit;
    if (error?.status === 503 || error?.code === "SERVICE_SETUP_INCOMPLETE") return copy.statusUnavailable;
    if (error?.code === "NETWORK") return copy.statusNetwork;
    return copy.statusError;
  };

  const refreshInbox = async (manual = false) => {
    if (!inbox || busy || refreshing) return;
    if (inbox.expiresAt <= Date.now()) { updateExpiry(); return; }
    refreshing = true;
    if (manual) setBusy(true);
    if (manual) setStatus(copy.statusRefreshing);
    try {
      const data = await request("/api/inbox", { token: inbox.token });
      if (!root.isConnected || !inbox) return;
      const nextExpiry = Number(data.expiresAt);
      if (Number.isFinite(nextExpiry)) inbox.expiresAt = nextExpiry;
      saveSession(inbox);
      renderMessages(data.messages);
      updateExpiry();
      if (manual) setStatus(copy.statusReady);
    } catch (error) {
      if (error?.status === 404 || error?.status === 401 || error?.code === "INBOX_EXPIRED") {
        inbox = null;
        clearTimers();
        clearSession();
        showInbox();
        list.replaceChildren();
        empty.hidden = false;
        expiry.textContent = copy.expired;
        setStatus(copy.statusExpired);
      } else {
        setStatus(displayError(error));
      }
    } finally {
      refreshing = false;
      if (manual && root.isConnected) setBusy(false);
    }
  };

  const startTimers = () => {
    clearTimers();
    timers.push(setInterval(() => refreshInbox(false), 15000));
    timers.push(setInterval(() => {
      if (!root.isConnected) { clearTimers(); return; }
      updateExpiry();
    }, 1000));
  };

  createButton.addEventListener("click", async () => {
    if (busy) return;
    setBusy(true);
    setStatus(copy.statusCreating);
    try {
      const data = await request("/api/inboxes", { method: "POST", body: {} });
      if (typeof data.address !== "string" || !/^dn-[a-f0-9]{24}@mail\.hmdevelop\.me$/i.test(data.address)
        || typeof data.token !== "string" || data.token.length < 30 || !Number.isFinite(Number(data.expiresAt))) {
        throw new Error("INVALID_SERVICE_RESPONSE");
      }
      inbox = { address: data.address, token: data.token, expiresAt: Number(data.expiresAt) };
      saveSession(inbox);
      showInbox();
      list.replaceChildren();
      empty.hidden = false;
      setStatus(copy.statusReady);
      updateExpiry();
      startTimers();
      setBusy(false);
      await refreshInbox(false);
    } catch (error) {
      setStatus(displayError(error));
      setBusy(false);
    }
  });

  root.querySelector("#mail-refresh").addEventListener("click", () => refreshInbox(true));
  root.querySelector("#mail-delete").addEventListener("click", async () => {
    if (!inbox || busy) return;
    setBusy(true);
    try {
      await request("/api/inbox", { method: "DELETE", token: inbox.token });
      inbox = null;
      clearTimers();
      clearSession();
      showInbox();
      list.replaceChildren();
      empty.hidden = false;
      expiry.textContent = "";
      setStatus(copy.statusDeleted);
    } catch (error) {
      if (error?.status === 404 || error?.status === 401 || error?.code === "INBOX_EXPIRED") {
        inbox = null;
        clearTimers();
        clearSession();
        showInbox();
        list.replaceChildren();
        empty.hidden = false;
        expiry.textContent = copy.expired;
        setStatus(copy.statusExpired);
      } else {
        setStatus(copy.statusDeleteError);
      }
    } finally { setBusy(false); }
  });
  root.querySelector("#mail-copy").addEventListener("click", async () => {
    if (!inbox) return;
    try {
      await navigator.clipboard.writeText(inbox.address);
      setStatus(copy.copied);
    } catch {
      addressInput.focus();
      addressInput.select();
      setStatus(copy.copy);
    }
  });

  showInbox();
  if (inbox) {
    setStatus(copy.statusLoading);
    updateExpiry();
    refreshInbox(false);
    startTimers();
  }
}
