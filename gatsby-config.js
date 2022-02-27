module.exports = {
  siteMetadata: {
      title: ``,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-sanity',
    options: {
      "projectId": "wsccgrx8",
      "dataset": "production",
      watchMode: true,
      'token': 'sk81aPTZm7Ex2mcB4Y6wJQcQvewvkwJAcdVKACgFyIc5tdP3nYUrwfcHPfA1P6qOvX44cCMHceyb0z9X7b2sUD5ksq9h4TiTKDkqSnbRuSp3bG6jNMz6Vg5mKnz2CiHRzbLQgq9hVl50d2OmXLa1ejLkbZ0wFbxm8qQGsB3nYl2ORewR6PAh'
    }
  }, "gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};