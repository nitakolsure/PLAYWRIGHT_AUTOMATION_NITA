import { type Page, type Response } from '@playwright/test';

export function waitForStoreApi(page: Page, path: string): Promise<Response> {
  return page.waitForResponse(
    (response) => response.url().includes(path) && response.ok(),
    { timeout: 15000 },
  );
}
