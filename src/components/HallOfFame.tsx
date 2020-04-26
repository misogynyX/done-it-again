import React from "react"
import HallOfFameRank from "./HallOfFameRank"

interface Props {
  worstCps: CpStats[]
  bestCps: CpStats[]
}

const HallOfFame = (props: Props) => {
  const max = props.worstCps[0].ratio

  return (
    <section>
      <h2>(불)명예의 전당</h2>
      <HallOfFameRank kind="bad" cps={props.worstCps} max={max} />
      <HallOfFameRank kind="good" cps={props.bestCps} max={max} />
    </section>
  )
}

export default HallOfFame
