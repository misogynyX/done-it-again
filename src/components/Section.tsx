import React from "react"

import styles from "./Section.module.css"
import Article from "./Article"
import Pie from "./Pie"
import Mark from "./Mark"

interface Props {
  group: ArticleGroup
}

const Section = (props: Props) => {
  const { tagDef, tagFreq, articles } = props.group

  return (
    <section id={tagDef.tag} className={styles.root}>
      <h3>{tagDef.title}</h3>
      <div className={styles.guide}>
        <p dangerouslySetInnerHTML={{ __html: tagDef.description }} />
      </div>
      {tagDef.tag === "recent" ? (
        ""
      ) : (
        <div className={styles.stats}>
          <p>
            <Pie ratio={tagFreq.ratio} />
            최근 6개월 이내에 수집된 기사 중 부적절한 표현이 담긴 기사는 총 <strong>{tagFreq.total}건</strong> 입니다.
            이 중 <Mark>{tagDef.title}</Mark> 범주에 속한 표현이 담긴 기사는 총 <strong>{tagFreq.count}건</strong>으로
            약 <strong>{Math.round(tagFreq.ratio * 1000) / 10}%</strong> 입니다.
          </p>
        </div>
      )}
      <ol className={styles.articles}>
        {articles.map(article => (
          <Article key={article.article_id} article={article} tagDef={tagDef} />
        ))}
      </ol>
    </section>
  )
}

export default Section
