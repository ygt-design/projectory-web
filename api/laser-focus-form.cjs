const { URLSearchParams } = require("url");

// Upstream Google Apps Script endpoint. Prefer env var; fallback to the
// same URL used elsewhere in the project.
const DEFAULT_APPSCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbybMopcIjh1FIlGF7FarKew6nta_eLIJ5oUvJvoWUe-yTKFt4Mc7uMlkonViN1tYKWP/exec";
const UPSTREAM_URL =
  process.env.LASER_FOCUS_APPSCRIPT_URL || DEFAULT_APPSCRIPT_URL;
const API_KEY = process.env.LASER_FOCUS_API_KEY || "";

async function fetchJsonWithBackoff(
  url,
  options = {},
  maxRetries = 2,
  initialDelay = 300
) {
  let attempt = 0;
  let delay = initialDelay;
  while (true) {
    attempt++;
    try {
      const response = await fetch(url, options);
      const text = await response.text();
      const first = text.trim().charAt(0);
      if (first === "<") {
        throw new Error(
          `Upstream responded with HTML, not JSON. Status=${response.status}`
        );
      }
      return text ? JSON.parse(text) : {};
    } catch (err) {
      if (attempt >= maxRetries) throw err;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method === "GET") {
      // Forward all query params to the Apps Script
      const params = new URLSearchParams(req.query || {});
      if (API_KEY) params.set("key", API_KEY);
      const url = `${UPSTREAM_URL}?${params.toString()}`;
      const json = await fetchJsonWithBackoff(url, {
        method: "GET",
        headers: { "Cache-Control": "no-store" },
      });
      return res.status(200).json(json);
    }

    if (req.method === "POST") {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify(req.body || {});
      const url = API_KEY
        ? `${UPSTREAM_URL}?key=${encodeURIComponent(API_KEY)}`
        : UPSTREAM_URL;
      const json = await fetchJsonWithBackoff(url, {
        method: "POST",
        headers,
        body,
      });
      return res.status(200).json(json);
    }

    res.setHeader("Allow", "GET,POST,OPTIONS");
    return res.status(405).send("Method Not Allowed");
  } catch (err) {
    console.error("[laser-focus-form] proxy error:", err);
    return res.status(500).json({ error: `Proxy error: ${err.message}` });
  }
};
