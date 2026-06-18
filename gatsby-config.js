module.exports = {
  siteMetadata: {
    title: `Salus Scheduling`,
    description: `Healthcare workforce scheduling platform powered by Staffy. Schedule your people first. Fill the rest with ours.`,
    siteUrl: `https://salusworkforcemanagement.staffy.com`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-hubspot`,
      options: {
        trackingCode: `23801619`,
        respectDNT: true,
        productionOnly: true,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
}
