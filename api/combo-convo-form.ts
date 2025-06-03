// projectory-web/projectory/api/combo-convo-form.ts
import { parse } from 'qs'

const LOOKUP_URL =
  'https://script.google.com/macros/s/AKfycbwkRIM-…/exec'
const SUBMIT_URL =
  'https://script.google.com/macros/s/AKfycbwkRIM-…/exec'

/**
 * A simple fetch-with-backoff helper (you can keep what you already wrote).
 */
async function fetchJsonWithBackoff(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3,
  initialDelay: number = 500
): Promise<any> {
  let attempt = 0
  let delay = initialDelay

  while (true) {
    attempt++
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`fetchJsonWithBackoff: received HTTP ${response.status} for URL ${url}, response: ${errorText}`);
        throw new Error(`HTTP ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(`fetchJsonWithBackoff attempt ${attempt} failed for URL ${url}:`, err);
      if (attempt >= maxRetries) {
        throw err
      }
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay *= 2
    }
  }
}

export default async function handler(
  req: { method: string; headers: Record<string, any>; body: any },
  res: { setHeader: (h: string, v: string) => void; status: (c: number) => any }
) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method === 'GET') {
    try {
      const json = await fetchJsonWithBackoff(LOOKUP_URL)
      return res.status(200).json(json)
    } catch (err) {
      console.error(`Lookup proxy error calling ${LOOKUP_URL}:`, err);
      return res.status(500).json({ error: `Lookup failed: ${err.message}` });
    }
  }

  if (req.method === 'POST') {
    let payloadObj: Record<string, any> = {}
    const contentType = (req.headers['content-type'] || '').toString()

    if (contentType.includes('application/x-www-form-urlencoded')) {
      payloadObj = parse(req.body as string)
    } else if (contentType.includes('application/json')) {
      payloadObj = (req.body as any) || {}
    } else {
      return res.status(415).json({ error: 'Unsupported content type' })
    }

    console.log('POST payload:', payloadObj);

    try {
      const json = await fetchJsonWithBackoff(
        SUBMIT_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadObj),
        }
      )
      return res.status(200).json(json)
    } catch (err) {
      console.error(`Submit proxy error calling ${SUBMIT_URL} with payload ${JSON.stringify(payloadObj)}:`, err);
      return res.status(500).json({ error: `Submission failed: ${err.message}` });
    }
  }

  res.setHeader('Allow', 'GET,POST,OPTIONS')
  return res.status(405).send('Method Not Allowed')
}