import { defineConfig, devices } from '@playwright/test';
import '@dotenvx/dotenvx/config'; // loads .env (HEADED, API_USERNAME, API_PASSWORD)

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0, // retries can hide defects; enable only explicitly
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: '**/api/*.spec.ts',
      use: { baseURL: 'https://restful-booker.herokuapp.com' },
    },
    {
      name: 'ui',
      testMatch: '**/ui/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
        testIdAttribute: 'data-test',
        headless: process.env.HEADED !== 'true',
      },
    },
  ],
});

