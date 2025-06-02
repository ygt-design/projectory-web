// projectory/api/combo-convo-form.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'qs';

/**
 * Performs a fetch with exponential backoff, retrying up to maxRetries times.
 */
async function fetchJsonWithBackoff(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3,
  initialDelay: number = 500
): Promise<any> {
  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    attempt++;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      if (attempt >= maxRetries) {
        throw err;
      }
      // Wait for the delay period
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}

const LOOKUP_URL =
  'https://script.google.com/macros/s/AKfycbyv6a7cBS4N2iLAYPWlK0TVOtQhRacJ2vE4FdIvErmDHz0o-NtrwIxzSwWeC143ujlFnA/exec';
const SUBMIT_URL =
  'https://script.google.com/macros/s/AKfycbyv6a7cBS4N2iLAYPWlK0TVOtQhRacJ2vE4FdIvErmDHz0o-NtrwIxzSwWeC143ujlFnA/exec';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    try {
      const json = await fetchJsonWithBackoff(LOOKUP_URL);
      return res.status(200).json(json);
    } catch (err) {
      console.error('Lookup proxy error:', err);
      return res.status(500).json({ error: 'Lookup failed' });
    }
  }

  if (req.method === 'POST') {
    let payloadObj: Record<string, any> = {};
    const contentType = (req.headers['content-type'] || '').toString();

    if (contentType.includes('application/x-www-form-urlencoded')) {
      payloadObj = parse(req.body as string);
    } else if (contentType.includes('application/json')) {
      payloadObj = (req.body as any) || {};
    } else {
      return res.status(415).json({ error: 'Unsupported content type' });
    }

    try {
      const json = await fetchJsonWithBackoff(
        SUBMIT_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadObj),
        }
      );
      return res.status(200).json(json);
    } catch (err) {
      console.error('Submit proxy error:', err);
      return res.status(500).json({ error: 'Submission failed' });
    }
  }

  res.setHeader('Allow', 'GET,POST,OPTIONS');
  return res.status(405).send('Method Not Allowed');
}