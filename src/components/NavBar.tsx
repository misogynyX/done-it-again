import React from "react"
import ScrollspyNav from "react-scrollspy-nav"
import styles from "./NavBar.module.css"

interface Item {
  key: string;
  label: string;
}

interface Props {
  items: Item[];
}

const NavBar = (props: Props) => {
  return (
    <nav className={styles.root}>
      <ScrollspyNav
        scrollTargetIds={props.items.map(item => item.key).filter(key => key !== '/')}
        offset={-100}
        scrollDuration={300}
        className={styles.root}
        activeNavClass={styles.active}
      >
        <ul>
          {
            props.items.map(item => (
              <li key={ item.key }>
                <a href={item.key === '/' ? '/' : '#' + item.key}>{ item.label }</a>
              </li>)
            )
          }
        </ul>
      </ScrollspyNav>
    </nav>
  )
}

export default NavBar
