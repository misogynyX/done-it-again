import React from "react"

import styles from "./SectionList.module.css"
import Section from "./Section"

interface Props {
  articleGroups: ArticleGroup[]
}

const SectionList = (props: Props) => {
  const groups = props.articleGroups

  return (
    <section className={styles.root}>
      <h2>기사 모음</h2>
      <ul>
        {groups.map(group => (
          <Section key={group.tagDef.tag} group={group}></Section>
        ))}
      </ul>
    </section>
  )
}

export default SectionList
