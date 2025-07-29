// @ts-check
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI; // Auto-detect if running in CI (e.g., GitHub Actions)

/**
 * Playwright Configuration File
 * Supports both local development and CI environments.
 */
export default defineConfig({
  // 📁 Directory where your tests are stored
  testDir: './tests',

  // ✅ Run tests inside each file in parallel
  fullyParallel: true,

  // 🚫 Prevent `.only()` in CI to avoid skipping tests accidentally
  forbidOnly: isCI,

  // 🔁 Retries: 2 in CI, 0 locally
  retries: isCI ? 2 : 0,

  // ⚙️ CI: Use 1 worker to reduce flakiness, Local: default (all CPU cores)
  workers: isCI ? 1 : 2,

  // 🧾 Use HTML reporter for both CI and local
  reporter: 'html',

  // 🔧 Default test options (applied to all tests)
  use: {
    headless: false, // Set to true if you want headless runs by default
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // 🌐 Cross-browser testing setup
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});