const { defineConfig } = require('cypress');

// Local `next dev` has no basePath (see stack/next/next.config.js).
// Production / CI serve the static export under /peptide-site.
const baseUrl =
  process.env.CYPRESS_BASE_URL ||
  (process.env.CI ? 'http://localhost:3000/peptide-site' : 'http://localhost:3000');

module.exports = defineConfig({
  e2e: {
    baseUrl,
    specPattern: ['e2e/**/*.cy.js', 'smoke/**/*.cy.js'],
    screenshotsFolder: 'screenshots',
    videosFolder: 'videos',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false,
  },
});
