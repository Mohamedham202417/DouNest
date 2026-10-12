import { t } from "../i18n.js";
import { toastSuccess } from "../toast.js";

export function render(root) {
  root.innerHTML = `
    <div class="field">
      <label>Pick a color</label>
      <input type="color" id="pick" value="#0ea5e9">
    </div>
    <div class="field">
      <label>HEX</label><input type="text" id="hex" value="#0ea5e9">
    </div>
    <div class="row">
      <div class="field" style="flex:1"><label>RGB</label><input type="text" id="rgb" readonly></div>
      <div class="field" style="flex:1"><label>HSL</label><input type="text" id="hsl" readonly></div>
    </div>
    <div class="row">
      <button class="btn" id="copy">${t("tool.copy")}</button>
      <div style="flex:1;height:40px;border-radius:10px;border:1px solid var(--border)" id="preview"></div>
    </div>
  `;
  const pick = root.querySelector("#pick");
  const hex = root.querySelector("#hex");
  const rgb = root.querySelector("#rgb");
  const hsl = root.querySelector("#hsl");
  const preview = root.querySelector("#preview");

  const hexToRgb = (h) => {
    h = h.replace("#","");
    if (h.length === 3) h = h.split("").map(c=>c+c).join("");
    const n = parseInt(h, 16);
    return { r: (n>>16)&255, g: (n>>8)&255, b: n&255 };
  };
  const rgbToHsl = ({r,g,b}) => {
    r/=255; g/=255; b/=255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    let h=0,s=0,l=(max+min)/2;
    if (max!==min) {
      const d = max-min;
      s = l > .5 ? d/(2-max-min) : d/(max+min);
      switch(max){
        case r: h=(g-b)/d+(g<b?6:0); break;
        case g: h=(b-r)/d+2; break;
        case b: h=(r-g)/d+4; break;
      }
      h*=60;
    }
    return {h:Math.round(h), s:Math.round(s*100), l:Math.round(l*100)};
  };
  const update = (val) => {
    try {
      if (!/^#?[0-9a-f]{3,8}$/i.test(val)) return;
      const v = val.startsWith("#") ? val : "#"+val;
      pick.value = v.length === 4 ? "#"+v.slice(1).split("").map(c=>c+c).join("") : v.slice(0,7);
      const c = hexToRgb(v);
      const h = rgbToHsl(c);
      rgb.value = `rgb(${c.r}, ${c.g}, ${c.b})`;
      hsl.value = `hsl(${h.h}, ${h.s}%, ${h.l}%)`;
      preview.style.background = v;
    } catch {}
  };
  pick.oninput = e => { hex.value = e.target.value; update(e.target.value); };
  hex.oninput = e => update(e.target.value);
  root.querySelector("#copy").onclick = () => {
    navigator.clipboard.writeText(`${hex.value} | ${rgb.value} | ${hsl.value}`);
    toastSuccess(t("tool.copied"));
  };
  update("#0ea5e9");
}