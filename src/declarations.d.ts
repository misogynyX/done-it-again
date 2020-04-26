type Article = {
  article_id: string
  cp_name: string
  title: string
  description: string
  authors: string[]
  keywords: string[]
  date: string
  url: string
  tags: string[]
}

type TagDef = {
  tag: string
  title: string
  description: string
}

type ArticleGroup = {
  tagDef: TagDef
  tagFreq: TagFrequency
  articles: Article[]
}

type DailyStats = {
  date: string
  total: number
  bad: number
}

type CpStats = {
  cp_name: string
  total: number
  bad: number
  ratio: number
}

type TagFrequency = {
  tag: string
  total: number
  count: number
  ratio: number
}

declare module "*.css" {
  const content: { [className: string]: string }
  export = content
}
