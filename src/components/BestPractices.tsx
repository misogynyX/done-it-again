import React from "react"
import styles from "./BestPractices.module.css"

const BestPractices = () => (
  <section className={styles.root}>
    <h2>가이드라인</h2>

    <section>
      <h3>성폭력 사건 보도 수첩</h3>
      <p>
        <a
          href="http://www.mogef.go.kr/mp/pcd/mp_pcd_s001d.do?mid=plc504&amp;bbtSn=695063"
          target="_blank"
          rel="noopener noreferrer"
        >
          성폭력 사건 보도 수첩
        </a>
        은 성폭력 사건 2차 피해 방지를 위해 여성가족부와 한국기자협회가 공동으로 제작하여 2014년에 공개한 자료입니다.
      </p>
    </section>

    <section>
      <h3>성폭력 보도 가이드라인</h3>
      <p>
        성폭력 사건이 보도되는 것은 &lsquo;성폭력 근절&rsquo;이라는 공공성을 갖추어야 하고 그러기 위해 성폭력피해생존자
        관점의 보도가 필요합니다. 여성민우회에서는 성폭력 보도 시 최소한의 보도수칙으로{" "}
        <a href="http://womenlink.or.kr/archives/3798" target="_blank" rel="noopener noreferrer">
          성폭력 보도 가이드라인
        </a>
        을 만들어 2006년에 공개하였습니다.
      </p>
    </section>

    <section>
      <h3>성폭력 범죄 보도 세부 권고 기준</h3>
      <p>
        성폭력 범죄 보도는 사건의 특성상 취재와 보도과정에서 피해자와 그 가족 등이 2차 피해를 볼 수 있고, 사회 전반에
        미치는 영향이 크다는 점에서 매우 신중히 접근해야 합니다. 이에 한국기자협회는{" "}
        <a href="https://www.journalist.or.kr/news/section4.html?p_num=9">성범죄 보도 세부 권고 기준</a>을 마련해
        2012년에 공개하였습니다.
      </p>
    </section>
  </section>
)

export default BestPractices
