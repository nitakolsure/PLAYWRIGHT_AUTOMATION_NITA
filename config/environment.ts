import fs from 'fs';
import path from 'path';

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

loadEnvFile();

export const environment = {
  webBaseURL: process.env.WEB_BASE_URL ?? 'https://playwright.dev',
  apiBaseURL: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
  storeBaseURL: process.env.STORE_BASE_URL ?? 'https://www.demoblaze.com',
};
