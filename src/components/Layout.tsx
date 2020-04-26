import React from "react"

import styles from "./Layout.module.css"
import Header from "./Header"
import Footer from "./Footer"

interface Props {
  children: React.ReactNode
}

const Layout = (props: Props) => {
  return (
    <div className={styles.root}>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}

export default Layout
