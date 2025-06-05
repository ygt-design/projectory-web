import http from "k6/http";
import { check, sleep } from "k6";

const APPS_SCRIPT_LOOKUP_URL =
  "https://script.google.com/macros/s/AKfycbx6qI9uaV8lQz41DthnTenLx3QBByHUj903YTNd5PIb7KxOoe0zpJMVSX_fVcF9cuOLhA/exec";

export function setup() {
  // Fetch the lookup data (dropdown options) from the Apps Script
  const res = http.get(`${APPS_SCRIPT_LOOKUP_URL}?mode=`);
  const data = res.json();
  return {
    whatIsAList: data.whatIsA,
    thatCouldList: data.thatCould,
  };
}

// === CONFIGURE YOUR TEST HERE ===
// 1) If you’re pointing at the Apps Script directly, set URL to that.
// 2) If you’re pointing at your proxy, set URL to https://www.projectory.live/api/combo-convo-form
// For Phase 1 (Apps Script target):
// const URL = "https://script.google.com/macros/s/AKfycb…<TEST_VERSION_ID>…/exec";
//
// For Phase 2 (your proxy):
const URL = "https://www.projectory.live/api/combo-convo-form";

// RAMP SCHEDULE: ramp up to 100 VUs over 20s, hold 100 for 40s, then ramp down.
// Adjust “target” rings to whatever max-concurrency you want (e.g. 200 or 300).
export let options = {
  stages: [
    { duration: "20s", target: 50 }, // ramp from 0 → 50 VUs in 20s
    { duration: "20s", target: 100 }, // ramp 50 → 100 in next 20s
    { duration: "40s", target: 100 }, // hold 100 VUs for 40s
    { duration: "20s", target: 0 }, // ramp 100 → 0 in 20s
  ],
  thresholds: {
    // If >5% of requests fail (non-2xx), test should be considered “failed”
    http_req_failed: ["rate < 0.05"],
    // 95% of requests should finish in < 40000ms (40s)
    // Adjust to something reasonable for your proxy + Apps Script latency
    http_req_duration: ["p(95) < 40000"],
  },
};

export default function (data) {
  // Build a pseudo-random payload to avoid duplicate keys or rate-limit logic inside the Sheet
  const rand = Math.floor(Math.random() * 1e7);
  const whatRandom =
    data.whatIsAList[Math.floor(Math.random() * data.whatIsAList.length)];
  const thatRandom =
    data.thatCouldList[Math.floor(Math.random() * data.thatCouldList.length)];

  const payloadObj = {
    orangeCard: `Mock orangeCard entry #${rand}`,
    blueCard: `Mock blueCard entry #${rand}`,
    whatIsA: whatRandom,
    thatCould: thatRandom,
    freeText: `Some mock freeText #${rand}`,
  };

  const payload = JSON.stringify(payloadObj);
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // POST to your endpoint
  const res = http.post(URL, payload, params);

  // Check for 2xx. If you see 429/5xx later in results, that means
  // either your proxy or Apps Script is refusing it.
  check(res, {
    "is status 2xx": (r) => r.status >= 200 && r.status < 300,
  });

  // Introduce a small random sleep (0–1s) so all VUs don’t send in lock-step
  sleep(Math.random() * 1);
}
