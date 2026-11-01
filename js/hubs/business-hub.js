export function render(root) {
  root.innerHTML = `<div class="hub-callout"><strong>Productivity &amp; Business tools</strong><p>Create invoices, CVs, barcodes, signatures, Wi‑Fi QR codes, timers, and notes in your browser.</p><div class="tools-grid mini">${["qr-code","invoice-generator","cv-builder","barcode-generator","signature-maker","wifi-qr-generator","pomodoro","online-notepad"].map(s=>`<a class="tool-card" href="../tools/${s}/">Open ${s}</a>`).join("")}</div><span class="badge success">🔒 Local input stays local</span></div>`;
}
