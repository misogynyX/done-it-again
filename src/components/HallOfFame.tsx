import HallOfFameRank from "./HallOfFameRank"
import React from "react"

interface Props {
  worstCps: CpStats[]
  bestCps: CpStats[]
}

const HallOfFame = (props: Props): React.ReactElement => {
  const max = props.worstCps[0].ratio

  return (
    <section id="hallOfFame">
      <h2>(불)명예의 전당</h2>
      <HallOfFameRank kind="bad" cps={props.worstCps} max={max} />
      <HallOfFameRank kind="good" cps={props.bestCps} max={max} />
    </section>
  )
}

export default HallOfFame
