// projectory/api/combo-convo-form.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'qs';

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
      const scriptRes = await fetch(LOOKUP_URL);
      const json = await scriptRes.json();
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
      const scriptRes = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadObj),
      });
      const json = await scriptRes.json();
      return res.status(200).json(json);
    } catch (err) {
      console.error('Submit proxy error:', err);
      return res.status(500).json({ error: 'Submission failed' });
    }
  }

  res.setHeader('Allow', 'GET,POST,OPTIONS');
  return res.status(405).send('Method Not Allowed');
}