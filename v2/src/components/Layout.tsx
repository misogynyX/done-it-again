import React from "react"

interface Props {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <footer>
        &copy; {new Date().getFullYear()}
        &nbsp;
        <a href="https://again.misogyny.com/v2">https://again.misogyny.com/v2</a>
      </footer>
    </>
  )
}

export default Layout
