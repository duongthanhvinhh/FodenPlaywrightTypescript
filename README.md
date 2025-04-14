# 🧪 Playwright Commands
After initializing Playwright with:
npm init playwright@latest

You can run the following commands inside your project directory:
# 🧪 Run all tests (end-to-end)
npx playwright test

# 🧑‍💻 Launch interactive UI mode
npx playwright test --ui

# 🌐 Run tests only on Chromium (Desktop Chrome)
npx playwright test --project=chromium

# 📁 Run a specific test file
npx playwright test example.spec.ts

# 🐞 Run tests in debug mode (with inspector) or saving a trace.zip file to debug
npx playwright test --debug <br>
npx playwright test --trace on 

# ✨ Auto-generate tests using Codegen
npx playwright codegen

# 📊 Show HTML test report after test run
npx playwright show-report

# 🖥️ Run in headed (non-headless) mode on Chromium
npx playwright test --project=chromium --headed

# 📌 Run a specific test file in headed mode on Chromium
npx playwright test example.spec.ts --project=chromium --headed

# 🎯 Run a specific test by name (with grep)
npx playwright test -g "Foden verify has title" --project=chromium --headed
