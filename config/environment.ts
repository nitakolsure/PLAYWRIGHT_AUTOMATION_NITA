import fs from 'fs';
import path from 'path';

const allowedEnvironments = new Set(['qa', 'stage']);

function loadEnvFile() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function assertSafeUrl(label: string, value: string) {
  let hostname: string;
  try {
    hostname = new URL(value).hostname.toLowerCase();
  } catch {
    throw new Error(`${label} is not a valid URL: ${value}`);
  }

  const labels = hostname.split('.');
  if (labels.includes('prod') || labels.includes('production')) {
    throw new Error(`${label} points at a production host (${hostname}). Use a qa or stage URL.`);
  }
}

loadEnvFile();

const name = (process.env.TEST_ENV ?? 'qa').toLowerCase();
if (!allowedEnvironments.has(name)) {
  throw new Error(`TEST_ENV must be qa or stage. Received "${name}".`);
}

const webBaseURL = process.env.WEB_BASE_URL ?? 'https://playwright.dev';
const apiBaseURL = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
const storeBaseURL = process.env.STORE_BASE_URL ?? 'https://www.demoblaze.com';

assertSafeUrl('WEB_BASE_URL', webBaseURL);
assertSafeUrl('API_BASE_URL', apiBaseURL);
assertSafeUrl('STORE_BASE_URL', storeBaseURL);

export const environment = {
  name,
  webBaseURL,
  apiBaseURL,
  storeBaseURL,
};
