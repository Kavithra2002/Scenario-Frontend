/**
 * Pings the scenario-backend health endpoint and logs the result in the terminal.
 * Used when running the frontend (npm run dev) so you can see "Backend connected" in the same terminal.
 *
 * Uses NEXT_PUBLIC_API_URL from env or defaults to http://localhost:4000.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const HEALTH_PATH = "/api/health";
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;
const INITIAL_DELAY_MS = 3000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkBackend() {
  try {
    const res = await fetch(`${BACKEND_URL.replace(/\/$/, "")}${HEALTH_PATH}`);
    const data = await res.json();
    if (res.ok && data?.ok) {
      return { ok: true, service: data.service };
    }
    return { ok: false };
  } catch {
    return { ok: false };
  }
}

async function main() {
  await sleep(INITIAL_DELAY_MS);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const result = await checkBackend();
    if (result.ok) {
      console.log("[Backend] ✓ Successfully connected to " + BACKEND_URL + " (" + (result.service || "scenario-backend") + ")");
      process.exit(0);
    }
    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY_MS);
    }
  }

  console.log("[Backend] ✗ Not reachable at " + BACKEND_URL + " — start scenario-backend (e.g. cd scenario-backend; npm run dev)");
  process.exit(0);
}

main();
