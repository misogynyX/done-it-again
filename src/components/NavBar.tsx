import React, {useState} from "react"
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
  const [menuActivated, setMenuActivated] = useState(false)

  return (
    <nav className={styles.root}>
      <svg className={styles.button} style={menuActivated ? {} : {display: 'block'}} viewBox="0 0 10 10" onClick={() => setMenuActivated(!menuActivated)}>
        <line x1="3" y1="3.5" x2="7" y2="3.5" stroke="#FFF" strokeWidth="0.6" />
        <line x1="3" y1="5" x2="7" y2="5" stroke="#FFF" strokeWidth="0.6" />
        <line x1="3" y1="6.5" x2="7" y2="6.5" stroke="#FFF" strokeWidth="0.6" />
      </svg>
      <div className={styles.items} style={menuActivated ? {display: 'block'} : {}}>
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
                  <a href={item.key === '/' ? '/' : '#' + item.key} onClick={() => setMenuActivated(false)}>{ item.label }</a>
                </li>)
              )
            }
          </ul>
        </ScrollspyNav>
      </div>
    </nav>
  )
}

export default NavBar
