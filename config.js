/**
 * ============================================================
 * DouNest v3 — Central configuration (single source of truth)
 * ============================================================
 * Edit this file, then run `node build.mjs` to regenerate the
 * SEO landing pages, sitemap.xml and sw.js.
 *
 * IMPORTANT values for you:
 *  - origin + repoPath  : where the site lives (GitHub Pages)
 *  - adsense.client     : your AdSense publisher id (ca-pub-XXXX)
 *  - affiliateId        : your affiliate/sub id used by affiliate links
 *  - featured           : paid placements you sell to tool owners
 *  - support.url        : your BuyMeACoffee (or Ko-fi) page
 *  - analytics.gaId     : GA4 measurement id (G-XXXXXXX)
 */
var DouNestConfig = {
  /* ---- Site identity & hosting ---- */
  siteName: "DouNest",
  origin: "https://dounest.hmdevelop.me",
  repoPath: "",                // empty because the custom subdomain serves this site at /
  base: "auto",               // "auto" detects /DouNest/ automatically; or force "/" or "/DouNest/"
  twitter: "",                // e.g. "@yourhandle"
  googleSiteVerification: "", // paste the HTML-tag token from Search Console; leave blank until verified

  /* ---- 1) Google AdSense ----
     Fill client + per-position slot ids after approval.
     While empty, reserved (invisible-to-users) placeholders are rendered. */
  adsense: {
    client: "",               // "ca-pub-XXXXXXXXXXXXXXXX"
    slots: { top: "", inline: "", footer: "" }
  },

  /* ---- 2) Affiliate program ----
     affiliateId is appended to outbound links of domains mapped here.
     Example: "hostinger.com": "ref"  ->  ?ref=YOUR_ID          */
  affiliateId: "",
  affiliates: {
    // "hostinger.com": "ref",
    // "namecheap.com": "ref",
    // "nordvpn.com": "ref"
  },

  /* ---- 3) Featured / sponsored placements (you sell these) ----
     Example:
     featured: [
       { title: "CoolTool", desc: "What it does", url: "https://…", img: "https://…" }
     ]                                                            */
  featured: [],

  /* ---- 4) Support / donation ---- */
  /* Leave "" to hide the support button until you have your real page
     (e.g. "https://www.buymeacoffee.com/YOURNAME"). */
  support: {
    url: ""
  },

  /* ---- Analytics ---- */
  analytics: {
    gaId: ""                  // "G-XXXXXXXXXX" (leave "" to disable)
  }
};
