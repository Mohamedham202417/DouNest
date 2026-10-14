import { t } from "../i18n.js";
import { toastSuccess, toastError } from "../toast.js";
import { loadEsm, formatBytes, downloadBlob } from "../util.js";

/** Image → PDF: embeds each image as its own page (A4/Letter/Fit), with margin control. */
export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("i2p.pick")}</label>
      <input type="file" id="files" accept="image/jpeg,image/png,image/webp" multiple>
    </div>
    <div id="thumbs" class="thumb-grid" style="margin:10px 0"></div>
    <div class="row wrap" style="gap:10px">
      <div class="field" style="min-width:130px">
        <label>${t("i2p.size")}</label>
        <select id="size">
          <option value="a4">A4</option>
          <option value="letter">Letter</option>
          <option value="fit">${t("i2p.sizeFit")}</option>
        </select>
      </div>
      <div class="field" style="min-width:130px">
        <label>${t("i2p.orient")}</label>
        <select id="orient">
          <option value="auto">${t("i2p.auto")}</option>
          <option value="p">${t("i2p.portrait")}</option>
          <option value="l">${t("i2p.landscape")}</option>
        </select>
      </div>
      <div class="field" style="min-width:110px">
        <label>${t("i2p.margin")} (pt)</label>
        <input type="number" id="margin" value="0" min="0" max="72" step="6">
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="run" disabled>${t("i2p.create")}</button>
    </div>
    <div id="status" style="color:var(--text-muted);font-size:13px;margin-top:8px"></div>
  `;
  const files = root.querySelector("#files");
  const thumbs = root.querySelector("#thumbs");
  const run = root.querySelector("#run");
  const status = root.querySelector("#status");
  let ordered = [];

  const drawThumbs = () => {
    thumbs.innerHTML = "";
    ordered.forEach((f, i) => {
      const url = URL.createObjectURL(f);
      const d = document.createElement("div");
      d.className = "thumb";
      d.innerHTML = `<img src="${url}" alt=""><span>${i + 1}</span>`;
      d.title = `${f.name} — ${formatBytes(f.size)}`;
      d.onclick = () => { ordered.splice(i, 1); files.value = ""; drawThumbs(); };
      thumbs.appendChild(d);
    });
    run.disabled = ordered.length < 1;
  };
  files.onchange = () => {
    // merge picks across multiple selections; dedupe by name+size
    const seen = new Set(ordered.map(f => f.name + f.size));
    [...files.files].forEach(f => { if (!seen.has(f.name + f.size)) ordered.push(f); });
    drawThumbs();
  };

  run.onclick = async () => {
    if (!ordered.length) return toastError(t("tool.noInput"));
    status.textContent = "⏳ pdf-lib …";
    try {
      const { PDFDocument } = await loadEsm("https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.esm.min.js");
      const doc = await PDFDocument.create();
      const SIZES = { a4: [595.28, 841.89], letter: [612, 792] };
      const mode = root.querySelector("#size").value;
      const orient = root.querySelector("#orient").value;
      const margin = Math.max(0, +root.querySelector("#margin").value || 0);
      for (const f of ordered) {
        let bytes = await f.arrayBuffer();
        let type = f.type;
        if (type === "image/webp") {
          // pdf-lib cannot embed webp — re-encode via canvas to PNG
          const bmp = await createImageBitmap(f);
          const c = document.createElement("canvas");
          c.width = bmp.width; c.height = bmp.height;
          c.getContext("2d").drawImage(bmp, 0, 0);
          const blob = await new Promise(r => c.toBlob(r, "image/png"));
          bytes = await blob.arrayBuffer(); type = "image/png";
        }
        const img = type === "image/png"
          ? await doc.embedPng(bytes)
          : await doc.embedJpg(bytes);
        let pw, ph;
        if (mode === "fit") { pw = img.width + margin * 2; ph = img.height + margin * 2; }
        else {
          [pw, ph] = SIZES[mode];
          if (orient === "auto") { if (img.width > img.height && pw < ph) [pw, ph] = [ph, pw]; }
          else if (orient === "l" && ph > pw) [pw, ph] = [ph, pw];
          else if (orient === "p" && pw > ph) [pw, ph] = [ph, pw];
        }
        const page = doc.addPage([pw, ph]);
        const maxW = pw - margin * 2, maxH = ph - margin * 2;
        const scale = Math.min(maxW / img.width, maxH / img.height, 1);
        const w = img.width * scale, h = img.height * scale;
        page.drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
      }
      const out = await doc.save();
      status.textContent = `✓ ${ordered.length} ${t("i2p.pages")} — ${formatBytes(out.length)}`;
      downloadBlob(new Blob([out], { type: "application/pdf" }), "images.pdf");
      toastSuccess(t("tool.result") + " ✓");
    } catch (e) {
      status.textContent = "❌ " + e.message;
      toastError(t("tool.error"));
    }
  };
}
