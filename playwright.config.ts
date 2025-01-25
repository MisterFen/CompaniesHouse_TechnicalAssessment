import { defineConfig } from 'playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 10000,
  use: {
    baseURL: 'https://automationintesting.online/',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'Webkit', use: { browserName: 'webkit' } },
  ],
//   reporter: [['list'], ['html', { outputFolder: 'tests-output/reports' }]],
});