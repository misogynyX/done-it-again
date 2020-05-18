module.exports = {
  siteMetadata: {
    title: `언론이또 v2`,
    description: `언론의 여성혐오적 표현들`,
    siteUrl: `https://again.misogynyx.com`,
    author: `@misogynyx`,
  },
  plugins: [
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-typescript-checker`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-remark`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-WCLWH4M",
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
      },
    },
  ],
}
