import React from "react"

import styles from "./Article.module.css"

interface Props {
  article: Article
  tagDef: TagDef
}

function replaceHighlights(text: string, tag: string): string {
  return text.replace(/{(.+?)}(.+?){\/.+?}/g, (_m, p1, p2) => {
    return tag === "recent" || p1 === tag ? `<span class="bad">${p2}</span>` : p2
  })
}

const Article = (props: Props) => {
  const { article, tagDef } = props

  return (
    <li className={styles.root}>
      <div className={styles.meta}>
        <div className={styles.cpName}>{article.cp_name}</div>
        <div className={styles.authors}>{article.authors.join(",")}</div>
        <div className={styles.date}>{article.date}</div>
      </div>
      <h4 className={styles.title}>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          dangerouslySetInnerHTML={{ __html: replaceHighlights(article.title, tagDef.tag) }}
        />
      </h4>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: replaceHighlights(article.description, tagDef.tag) }}
      />
      <a className={styles.more} href={article.url} target="_blank" rel="noopener noreferrer">
        더 읽기
      </a>
    </li>
  )
}

export default Article
