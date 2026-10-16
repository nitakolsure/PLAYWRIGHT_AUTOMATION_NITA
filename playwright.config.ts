import { defineConfig, devices } from '@playwright/test';
import { environment } from './config/environment';
import { authStatePath } from './config/paths';

const ci = !!process.env.CI;
const browserTestsToSkip = ['**/api/**', '**/*.setup.ts', '**/order.spec.ts'];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: ci,
  retries: ci ? 2 : 0,
  reporter: ci
    ? [['github'], ['html', { open: 'never' }], ['list']]
    : [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: environment.webBaseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: environment.storeBaseURL,
      },
    },
    {
      name: 'chromium',
      testIgnore: browserTestsToSkip,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: browserTestsToSkip,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: browserTestsToSkip,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'store',
      testMatch: /demoblaze\/order\.spec\.ts/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: environment.storeBaseURL,
        storageState: authStatePath,
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: environment.apiBaseURL,
      },
    },
  ],
});
