import styles from "./Footer.module.css"
import React from "react"

const Footer = (): React.ReactElement => (
  <footer className={styles.root}>
    <div>
      <p>Contact</p>
      <ul>
        <li>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfteYkDdjcPiZAwgNCHj5af6NG_4sN7NayE5KITHDJWTKJrgw/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            새로운 단어나 표현 제안하기 💡
          </a>
        </li>
        <li>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdgTisseNnvx_uAIMUhf6Fy2ZVe9l42YAzk28Evo8tsYKV2ww/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            잘못된 기사 분류 신고하기 ⚠️
          </a>
        </li>
      </ul>

      <ul>
        <li>
          트위터{" "}
          <a href="https://twitter.com/newsgim12" target="_blank" rel="noopener noreferrer">
            @newsgim12
          </a>
        </li>
        <li>
          이메일 <a href="mailto:newsgim12@gmail.com">newsgim12@gmail.com</a>
        </li>
      </ul>

      <p>안내</p>
      <ul>
        <li>이 사이트의 모든 정보는 공익을 위한 목적으로 제공됩니다.</li>
        <li>
          이 사이트의 모든 기사는 알고리즘에 의해 자동으로 분류되었으며, 각 언론사의 기사 중 일부를
          샘플링한 결과이므로 오분류나 오차가 있을 수 있습니다.
        </li>
      </ul>
      <p className={styles.copyright}>&copy; {new Date().getFullYear()} misogynyx.com</p>
    </div>
  </footer>
)

export default Footer
