PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS inboxes (
  address TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT NOT NULL,
  address TEXT NOT NULL,
  from_address TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  text_body TEXT NOT NULL DEFAULT '',
  html_body TEXT NOT NULL DEFAULT '',
  attachment_count INTEGER NOT NULL DEFAULT 0,
  received_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  PRIMARY KEY (id, address),
  FOREIGN KEY (address) REFERENCES inboxes(address) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_messages_inbox_expiry ON messages(address, expires_at, received_at DESC);

CREATE TABLE IF NOT EXISTS create_limits (
  ip_hash TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL
);
