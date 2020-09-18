import Footer from "./Footer"
import Header from "./Header"
import styles from "./Layout.module.css"
import React from "react"

interface Props {
  children: React.ReactNode
}

const Layout = (props: Props): React.ReactElement => {
  return (
    <div className={styles.root}>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}

export default Layout
