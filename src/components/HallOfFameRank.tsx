import React from "react"
import Mark from "./Mark"
import Bar from "./Bar"
import styles from "./HallOfFameRank.module.css"

interface Props {
  kind: string
  max: number
  cps: CpStats[]
}

const HallOfFameRank = (props: Props) => {
  const top = props.cps[0]
  const topRatio = Math.round(top.ratio * 10000) / 100

  return (
    <section className={styles.root}>
      <h3>
        부적절한 표현을 {props.kind === "bad" ? <Mark>가장 많이 쓴</Mark> : <Mark good>가장 적게 쓴</Mark>} 언론사
      </h3>
      <p>
        각 언론사별로 최근 6개월 이내에 수집된 기사 중에서 부적절한 표현이 담긴 기사의 비율이 가장{" "}
        {props.kind === "bad" ? "높은" : "낮은"} 언론사를 꼽았습니다. 1위는 수집된 기사 총{" "}
        <strong>{top.total}건</strong> 중 부적절한 표현이 담긴 기사가 <strong>{top.bad}건</strong>
        으로 전체 기사의 <strong>{topRatio}%</strong>를 기록한 <Mark good={props.kind !== "bad"}>{top.cp_name}</Mark>{" "}
        입니다.
      </p>

      <ol className={styles.chart}>
        {props.cps.map((cp, i) => (
          <li key={i + 1}>
            <Bar name={cp.cp_name} rank={i + 1} total={cp.total} count={cp.bad} max={props.max} />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default HallOfFameRank
