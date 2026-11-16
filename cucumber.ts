import type { IConfiguration } from '@cucumber/cucumber/api';

const isCi = Boolean(process.env.CI);

const shared: Partial<IConfiguration> = {
  paths: ['features/**/*.feature'],
  requireModule: ['ts-node/register'],
  require: ['cucumber/support/**/*.ts', 'cucumber/steps/**/*.ts'],
  format: [
    'progress',
    'html:reports/cucumber-report.html',
    'json:reports/cucumber.json',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  strict: true,
  failFast: isCi,
  retry: isCi ? 1 : 0,
  worldParameters: {
    env: process.env.TEST_ENV ?? 'qa',
  },
};

function profile(overrides: Partial<IConfiguration> = {}): Partial<IConfiguration> {
  return { ...shared, ...overrides };
}

const config = {
  default: profile(),
  smoke: profile({ tags: '@smoke' }),
  api: profile({ tags: '@api', parallel: 2 }),
  ui: profile({ tags: '@ui' }),
};

export default config;
export type CucumberProfiles = typeof config;
