import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>${t("tool.input")}</label>
      <input type="color" id="pick" value="#0ea5e9" style="height:80px;padding:6px">
    </div>
    <div class="field"><label>HEX</label><input type="text" id="hex" readonly></div>
    <div class="field"><label>RGB</label><input type="text" id="rgb" readonly></div>
    <div class="field"><label>HSL</label><input type="text" id="hsl" readonly></div>
    <div class="row">
      <button class="btn" id="copyHex">${t("tool.copy")} HEX</button>
      <button class="btn" id="copyRgb">${t("tool.copy")} RGB</button>
      <button class="btn" id="copyHsl">${t("tool.copy")} HSL</button>
    </div>
    <div style="margin-top:14px;height:60px;border-radius:12px;border:1px solid var(--border)" id="pv"></div>
  `;
  const pick = root.querySelector("#pick");
  const hex = root.querySelector("#hex");
  const rgb = root.querySelector("#rgb");
  const hsl = root.querySelector("#hsl");
  const pv = root.querySelector("#pv");

  const update = (val) => {
    hex.value = val;
    const h = val.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map(c=>c+c).join("") : h, 16);
    const r = (n>>16)&255, g = (n>>8)&255, b = n&255;
    rgb.value = `rgb(${r}, ${g}, ${b})`;
    let rr=r/255, gg=g/255, bb=b/255;
    const mx=Math.max(rr,gg,bb), mn=Math.min(rr,gg,bb);
    let H=0,S=0,L=(mx+mn)/2;
    if (mx!==mn) {
      const d=mx-mn;
      S = L>.5 ? d/(2-mx-mn) : d/(mx+mn);
      switch(mx){
        case rr: H=(gg-bb)/d+(gg<bb?6:0); break;
        case gg: H=(bb-rr)/d+2; break;
        case bb: H=(rr-gg)/d+4; break;
      }
      H*=60;
    }
    hsl.value = `hsl(${Math.round(H)}, ${Math.round(S*100)}%, ${Math.round(L*100)}%)`;
    pv.style.background = val;
  };
  pick.oninput = e => update(e.target.value);
  root.querySelector("#copyHex").onclick = () => { navigator.clipboard.writeText(hex.value); toastSuccess(t("tool.copied")); };
  root.querySelector("#copyRgb").onclick = () => { navigator.clipboard.writeText(rgb.value); toastSuccess(t("tool.copied")); };
  root.querySelector("#copyHsl").onclick = () => { navigator.clipboard.writeText(hsl.value); toastSuccess(t("tool.copied")); };
  update("#0ea5e9");
}
