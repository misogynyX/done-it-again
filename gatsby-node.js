const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode, basePath: `pages` })
    const tokens = path.split("/")
    const category = tokens[1]
    const filename = tokens[2]
    createNodeField({ node, name: `category`, value: category })
    createNodeField({ node, name: `filename`, value: filename })
    createNodeField({ node, name: `slug`, value: `/${category}/${filename}/` })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date
            }
            fields {
              category
              filename
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { category, filename, slug } = node.fields

    const page = {
      path: slug,
      component: path.resolve(`./src/templates/Post.tsx`),
      context: { category, filename, slug },
    }
    actions.createPage(page)
  })
}
