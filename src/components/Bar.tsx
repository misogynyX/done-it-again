import React from "react"
import styles from "./Bar.module.css"

interface Props {
  name: string;
  rank: number;
  total: number;
  count: number;
  max: number;
  kind: string;
}

const Bar = (props: Props) => {
  const ratio = props.count / props.total
  const percent = Math.round(ratio * 10000) / 100 || 0
  const barPercent = (ratio / props.max) * 100 || 0

  return (
    <div className={styles.root}>
      <span className={styles.barContainer}>
        <span className={props.kind === "bad" ? styles.bad : styles.good} style={{ width: barPercent ? `${barPercent}%` : `1px` }} />
      </span>
      <span style={{ position: "absolute" }}>
        <span className={styles.rank}>{props.rank}.</span>
        <span className={styles.name}>{props.name}</span>
        <span className={styles.percent}>{percent}%</span>
        <span className={styles.counts}>
          ({props.total}건 중 {props.count}건)
        </span>
      </span>
    </div>
  )
}

export default Bar
