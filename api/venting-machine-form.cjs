/**
 * Vercel Serverless Function: Venting Machine Form Proxy
 *
 * Proxies requests to Google Apps Script for the Venting Machine form,
 * injecting server-side API key and ensuring JSON responses.
 *
 * Environment Variables Required:
 * - VENTING_MACHINE_API_KEY: API key for authentication
 * - VENTING_MACHINE_DEPLOYMENT_URL: Google Apps Script web app URL
 *
 * Routes:
 * GET /api/venting-machine-form?action=prompts → { prompts: string[4] }
 * POST /api/venting-machine-form body { answers: string[4] } → { ok: true }
 */

async function fetchJsonWithBackoff(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const text = await response.text();

      // Validate that we got JSON, not HTML
      if (text.trim().startsWith("<!")) {
        throw new Error(
          "Received HTML instead of JSON - Apps Script may be misconfigured"
        );
      }

      try {
        return JSON.parse(text);
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${parseError.message}`);
      }
    } catch (error) {
      console.error(`Attempt ${attempt}/${maxRetries} failed:`, error.message);

      if (attempt === maxRetries) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, attempt - 1) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Cache-Control");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Get environment variables
    const apiKey = process.env.VENTING_MACHINE_API_KEY;
    const deploymentUrl = process.env.VENTING_MACHINE_DEPLOYMENT_URL;

    if (!apiKey) {
      console.error("Missing VENTING_MACHINE_API_KEY environment variable");
      return res
        .status(500)
        .json({ error: "Server configuration error: missing API key" });
    }

    if (!deploymentUrl) {
      console.error(
        "Missing VENTING_MACHINE_DEPLOYMENT_URL environment variable"
      );
      return res
        .status(500)
        .json({ error: "Server configuration error: missing deployment URL" });
    }

    // Build URL with query parameters (inject API key server-side)
    const url = new URL(deploymentUrl);

    // Add all query parameters from the request, but override/inject the key
    Object.entries(req.query || {}).forEach(([key, value]) => {
      if (key !== "key") {
        // Don't pass through client-provided key
        url.searchParams.set(key, value);
      }
    });

    // Inject server-side API key
    url.searchParams.set("key", apiKey);

    // Prepare fetch options
    const fetchOptions = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    };

    // Add body for POST requests
    if (req.method === "POST" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    console.log(`[Venting Machine] ${req.method} ${url.toString()}`);

    // Make request to Apps Script
    const jsonResponse = await fetchJsonWithBackoff(
      url.toString(),
      fetchOptions
    );

    // Forward the JSON response
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("Venting Machine proxy error:", error);

    // Return JSON error response
    res.status(500).json({
      error: "Proxy request failed",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
