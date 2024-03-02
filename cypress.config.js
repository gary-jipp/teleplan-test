const {defineConfig} = require("cypress");
const {removeDirectory} = require('cypress-delete-downloads-folder');

module.exports = defineConfig({
  e2e: {
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1024,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      on('task', {removeDirectory});
      // implement node event listeners here
    },
  },
});
