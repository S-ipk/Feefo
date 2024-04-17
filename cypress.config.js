const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {


    //baseUrl: 'https://www.feefo.com/search-reviews/search-results'

    env: {
      reviews: "https://www.feefo.com/search-reviews/search-results"
     
    },


    video: false,
    //"retries": 2,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },


  },
});
