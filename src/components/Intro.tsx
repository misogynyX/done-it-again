import React from "react"
import styles from "./Intro.module.css"

interface Props {
  dailyStats: DailyStats
}

const Intro = (props: Props) => {
  const { date, total, bad } = props.dailyStats
  const month = parseInt(date.substr(4, 2), 10)
  const day = parseInt(date.substr(6, 2), 10)

  return (
    <section className={styles.root}>
      <div className={styles.dailyStats}>
        {month}월 {day}일에 수집된 기사 <strong>{total}건</strong> 중 부적절한 표현 <strong>{bad}건</strong>
      </div>
      <blockquote className={styles.quote}>
        <p>
          &ldquo;성폭력 사건의 보도는 ‘성폭력 근절’이라는 공공성을 갖추어야 한다. 성폭력에 대한 잘못된 통념을 재생산 할
          수 있는 보도를 해서는 안 된다. <br />
          <br />
          성폭력은 명백한 폭력이다. 성폭력을 가해자의 변명을 인용해 설명하거나 희화화, 선정적으로 보도해서는 안
          된다.&rdquo;
        </p>

        <cite>
          여성민우회 &lt;
          <a href="http://womenlink.or.kr/archives/3798" target="_blank" rel="noopener noreferrer">
            성폭력보도 가이드라인
          </a>
          &gt;
        </cite>
      </blockquote>

      <div className={styles.brief}>
        <p className={styles.title}>
          언론, 성차별 부추기는 관행 이어와 <br />
          보도, 성인지 감수성을 지녀야 할 때
        </p>
        <p>
          일상에서 뉴스를 보고 계신가요? <br />
          평소에 우리가 보고 듣는 뉴스에는 <br />
          <strong>성차별적 표현</strong>과 <strong>범죄를 미화하는 표현</strong>이 <br />
          익숙하게 자리잡고 있습니다.
        </p>

        <p>
          편하고 쉽게 쓰인 부적절한 <strong>그 표현들</strong>. <br />
          데이터 분석을 통해 <strong>그 표현들</strong>이 얼마나 자주 쓰이는지 <br />
          해당 기사를 직접 모았습니다.
        </p>

        <p>
          언론에서 마구잡이로 쓰는 단어의 외연을 걷어내고 <br />
          내포하는 의미를 바로 인식하는 것이 이 사이트의 취지입니다.
        </p>
      </div>
    </section>
  )
}

export default Intro
