export function render(root) {
  root.innerHTML = `<div class="hub-callout"><strong>Video &amp; Audio tools</strong><p>Local ffmpeg.wasm workflows load only when used.</p><div class="tools-grid mini">${["video-to-mp3","compress-video","trim-media","video-to-gif","audio-converter","voice-recorder","screen-recorder"].map(s=>`<a class="tool-card" href="../tools/${s}/">Open ${s}</a>`).join("")}</div><span class="badge success">🔒 Browser-first processing</span></div>`;
}
