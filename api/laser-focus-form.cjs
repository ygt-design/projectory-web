// LaserFocus proxy - forwards requests to Google Apps Script

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Your Apps Script deployment URL
  const APPSCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx008M516hGzbzP_8uczo-jgt0JSIclh5Dr_2bmz2Vor_Z7ONPA5Wc6v3dq18Ny7bGD/exec";

  try {
    if (req.method === "GET") {
      // Build URL with query params
      const queryString = new URLSearchParams(req.query || {}).toString();
      const url = queryString
        ? `${APPSCRIPT_URL}?${queryString}`
        : APPSCRIPT_URL;

      console.log("[laser-focus-form] GET request to:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: { "Cache-Control": "no-store" },
      });

      console.log("[laser-focus-form] Response status:", response.status);

      const text = await response.text();
      console.log("[laser-focus-form] Response text:", text.substring(0, 200));

      const data = JSON.parse(text);
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const response = await fetch(APPSCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body || {}),
      });

      const data = await response.json();
      return res.status(200).json(data);
    }

    res.setHeader("Allow", "GET,POST,OPTIONS");
    return res.status(405).send("Method Not Allowed");
  } catch (err) {
    console.error("[laser-focus-form] error:", err);
    return res.status(500).json({ error: err.message });
  }
};
