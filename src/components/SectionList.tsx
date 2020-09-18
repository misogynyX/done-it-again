import Section from "./Section"
import styles from "./SectionList.module.css"
import React from "react"

interface Props {
  articleGroups: ArticleGroup[]
}

const SectionList = (props: Props): React.ReactElement => {
  const groups = props.articleGroups

  return (
    <section id="articles" className={styles.root}>
      <h2>기사 모음</h2>
      <ul>
        {groups.map((group) => (
          <Section key={group.tagDef.tag} group={group}></Section>
        ))}
      </ul>
    </section>
  )
}

export default SectionList
