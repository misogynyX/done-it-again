import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

import Intro from "../components/Intro"
import SectionList from "../components/SectionList"
import HallOfFame from "../components/HallOfFame"
import BestPractices from "../components/BestPractices"

/**
 * Clease data returned by "recentArticles" query.
 *
 * - flatten nested data into plain list
 * - tokenize authors and tags fields into array
 * - remove duplicated articles
 * - add "recent" tag to recent 20 articles
 * - sort by date (desc)
 */
function cleanseArticles(data: any): Article[] {
  const articleIds = new Set()
  const articles: Article[] = []

  data.allArticlesCsv.group.forEach((g: any) => {
    g.nodes.forEach((node: any) => {
      // remove duplications
      if (articleIds.has(node["article_id"])) return
      articleIds.add(node["article_id"])

      // tokenize fields and flatten
      articles.push({
        ...node,
        authors: node["authors"].split(";"),
        tags: node["tags"].split(";"),
      })
    })
  })

  // sort by date (desc)
  articles.sort((a, b) => {
    if (a["date"] < b["date"]) return 1
    if (a["date"] > b["date"]) return -1
    return 0
  })

  // add "recent" tag to recent 20 articles
  for (let i = 0; i < 20; i++) {
    articles[i].tags.push("recent")
  }

  return articles
}

/**
 * Group articles by tag
 */
function groupArticles(tagDefs: TagDef[], tagFreqs: TagFrequency[], articles: Article[]): ArticleGroup[] {
  const map: { [index: string]: Article[] } = {}
  articles.forEach(article => {
    article["tags"].forEach(tag => {
      if (!map[tag]) map[tag] = []
      map[tag].push(article)
    })
  })
  return tagDefs.map(tagDef => {
    const tagFreq = tagFreqs.filter(freqs => freqs.tag === tagDef.tag)[0]
    return {
      tagDef,
      tagFreq: tagFreq || { tag: tagDef.tag, count: 0, total: 0, ratio: 0 },
      articles: map[tagDef.tag] || [],
    }
  })
}

const Index = ({ data }) => {
  const articles: Article[] = cleanseArticles(data)
  const tagDefs: TagDef[] = data.allTagDefsYaml.nodes
  const dailyStats: DailyStats = data.allStatsDailyCsv.nodes[0]
  const worstCps: CpStats[] = data.allStatsWorstCpsCsv.nodes
  const bestCps: CpStats[] = data.allStatsBestCpsCsv.nodes
  const tagFreqs: TagFrequency[] = data.allStatsFreqTagsCsv.nodes
  const groups: ArticleGroup[] = groupArticles(tagDefs, tagFreqs, articles)

  return (
    <Layout>
      <SEO title="홈" />
      <Intro dailyStats={dailyStats} />
      <SectionList articleGroups={groups} />
      <HallOfFame worstCps={worstCps} bestCps={bestCps} />
      <BestPractices />
    </Layout>
  )
}

export default Index

/**
 * Group by "tags" to fetch at least 20 articles per tag.
 */
export const query = graphql`
  query {
    allTagDefsYaml {
      nodes {
        tag
        title
        description
      }
    }

    allArticlesCsv(sort: { order: DESC, fields: date }) {
      group(field: tags, limit: 20) {
        nodes {
          title
          article_id
          authors
          cp_name
          date
          description
          keywords
          tags
          url
        }
      }
    }

    allStatsDailyCsv(limit: 1, sort: { order: DESC, fields: date }) {
      nodes {
        date
        total
        bad
      }
    }

    allStatsFreqTagsCsv {
      nodes {
        total
        tag
        ratio
        count
      }
    }

    allStatsWorstCpsCsv(limit: 10) {
      nodes {
        cp_name
        total
        bad
        ratio
      }
    }

    allStatsBestCpsCsv(limit: 10) {
      nodes {
        cp_name
        total
        bad
        ratio
      }
    }
  }
`
