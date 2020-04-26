import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import { graphql } from "gatsby"

const Post = ({ data }) => {
  const post = data.markdownRemark
  const siteUrl = data.site.siteMetadata.siteUrl

  return (
    <Layout>
      <Helmet>
        <link rel="canonical" href={`${siteUrl}${post.fields.slug}`} />
      </Helmet>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default Post

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
