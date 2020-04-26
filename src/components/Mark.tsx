import React from "react"

interface Props {
  children: string
  good?: boolean
}

const Mark = (props: Props) => <span className={props.good ? "good" : "bad"}>{props.children}</span>

export default Mark
