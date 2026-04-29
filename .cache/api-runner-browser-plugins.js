module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-hubspot/gatsby-browser.js'),
      options: {"plugins":[],"trackingCode":"23801619","respectDNT":true,"productionOnly":true},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby/dist/internal-plugins/partytown/gatsby-browser.js'),
      options: {"plugins":[]},
    }]
