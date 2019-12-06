/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Alexandr Shulaev",
    description: "Personal Portfolio Website",
  },
  plugins: [
    // {
    //   resolve: "gatsby-source-contentful",
    //   options: {
    //     spaceId: "",
    //     accessToken: "",
    //   },
    // },
    // Add typescript
    "gatsby-plugin-typescript",
    // Add google font
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Poppins"],
      },
    },
  ],
}
