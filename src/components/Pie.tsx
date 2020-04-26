import React from "react"
import styles from "./Pie.module.css"

interface Props {
  ratio: number
}

const Pie = (props: Props) => {
  const ratio = Math.max(props.ratio, 0.01)
  const x = Math.cos(2 * Math.PI * ratio)
  const y = Math.sin(2 * Math.PI * ratio)
  const largeArc = props.ratio > 0.5 ? 1 : 0

  return (
    <svg viewBox="-1 -1 2 2" className={styles.root}>
      <circle r="0.99" className={styles.bg} />
      <path d={`M 0.99 0 A 0.99 0.99 0 ${largeArc} 1 ${x} ${y} L 0 0 Z`} className={styles.fg} />
    </svg>
  )
}

export default Pie
