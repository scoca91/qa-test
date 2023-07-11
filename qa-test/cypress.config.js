const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    "env": {
      "baseUrl": "https://admin.staging.exberry-uat.io",
      "apiUrl":"https://admin-api-shared.staging.exberry-uat.io",
      "email": "qacandidate@gmail.com",
      "password": "p#xazQI!Y%z^L34a#"


    },
    "video": true,
    "videoUploadOnPasses": true,
    "viewportHeight": 1080,
    "viewportWidth": 1920,
    "pageLoadTimeout": 30000,
    "requestTimeout": 60000,
    "defaultCommandTimeout": 60000,
    "retries": 0,
    'numTestsKeptInMemory': 10,
    chromeWebSecurity: false,
  },
});
