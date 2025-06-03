const { parse } = require("qs");

const LOOKUP_URL =
  "https://script.google.com/macros/s/AKfycbyv6a7cBS4N2iLAYPWlK0TVOtQhRacJ2vE4FdIvErmDHz0o-NtrwIxzSwWeC143ujlFnA/exec";
const SUBMIT_URL = LOOKUP_URL;

async function fetchJsonWithBackoff(
  url,
  options = {},
  maxRetries = 3,
  initialDelay = 500
) {
  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    attempt++;
    try {
      const response = await fetch(url, options);

      const rawText = await response.text();

      const firstNonWhitespace = rawText.trimLeft().charAt(0);
      if (firstNonWhitespace === "<") {
        throw new Error(
          `Received HTML from ${url} (not JSON). Response snippet: ${rawText
            .trim()
            .slice(0, 100)}...`
        );
      }

      return JSON.parse(rawText);
    } catch (err) {
      console.error(
        `fetchJsonWithBackoff attempt ${attempt} failed for ${url}:`,
        err
      );
      if (attempt >= maxRetries) {
        throw err;
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

module.exports = async function handler(req, res) {
  console.log(`Handler called, method=${req.method}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    try {
      const json = await fetchJsonWithBackoff(LOOKUP_URL);
      return res.status(200).json(json);
    } catch (err) {
      console.error(`Lookup proxy error calling ${LOOKUP_URL}:`, err);

      return res.status(500).json({ error: `Lookup failed: ${err.message}` });
    }
  }

  if (req.method === "POST") {
    let payloadObj = {};
    const contentType = (req.headers["content-type"] || "").toString();

    if (contentType.includes("application/x-www-form-urlencoded")) {
      payloadObj = parse(req.body);
    } else if (contentType.includes("application/json")) {
      payloadObj = req.body || {};
    } else {
      return res.status(415).json({ error: "Unsupported content type" });
    }

    console.log("POST payload:", payloadObj);

    try {
      const json = await fetchJsonWithBackoff(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadObj),
      });
      return res.status(200).json(json);
    } catch (err) {
      console.error(
        `Submit proxy error calling ${SUBMIT_URL} with payload ${JSON.stringify(
          payloadObj
        )}:`,
        err
      );
      return res
        .status(500)
        .json({ error: `Submission failed: ${err.message}` });
    }
  }

  res.setHeader("Allow", "GET,POST,OPTIONS");
  return res.status(405).send("Method Not Allowed");
};
