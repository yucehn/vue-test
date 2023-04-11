const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        log(message) {
          console.log("task: ", message);
          console.log("config responseTimeout: ", config.responseTimeout);

          return null;
        },
        hello({ greeting, name }) {
          console.log("%s, %s", greeting, name);

          return null;
        },
      });
    },
  },
  // pageLoadTimeout: 60000, // 設置config參數
});
