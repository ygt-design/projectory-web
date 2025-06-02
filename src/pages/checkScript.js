// checkScript.js
import fetch from "node-fetch";

(async () => {
  const url =
    "https://script.google.com/macros/s/AKfycbwkRIM-9HS6bAtntSb-0tUHE2PGqdJTRVBSRINmKd3CEqHvPx4LF-Vd-FyNvvuuypPrKg/exec";
  try {
    const res = await fetch(url);
    const body = await res.text();
    console.log("First 200 chars of response:\n", body.slice(0, 200));
  } catch (err) {
    console.error("Fetch error:", err);
  }
})();
