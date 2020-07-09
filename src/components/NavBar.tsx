import React, {useState} from "react"
import styles from "./NavBar.module.css"

interface Item {
  key: string;
  label: string;
}

interface Props {
  items: Item[];
}

const NavBar = (props: Props) => {
  const isSSR = typeof window === "undefined"
  const [menuActivated, setMenuActivated] = useState(false)

  return isSSR ? <></> : (
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

interface ScrollspyNavProps {
  scrollTargetIds: string[];
  activeNavClass: string;
  scrollDuration?: number;
  headerBackground?: string;
  offset?: number;
  children: any;
  className: string;
}

class ScrollspyNav extends React.Component<ScrollspyNavProps, {}, {}> {
  props: ScrollspyNavProps

  private scrollTargetIds: string[]
  private activeNavClass: string
  private scrollDuration: number
  private offset: number
  private homeDefaultLink: string

  constructor(props: ScrollspyNavProps) {
    super(props)

    this.props = props
    this.scrollTargetIds = props.scrollTargetIds
    this.activeNavClass = props.activeNavClass
    this.scrollDuration = Number(props.scrollDuration) || 1000
    this.offset = props.offset || 0
    this.homeDefaultLink = "/"

    this.onScroll = this.onScroll.bind(this)
  }

  onScroll() {
    let scrollSectionOffsetTop: number
    this.scrollTargetIds.forEach((sectionID, index) => {
      const sectionEl = document.getElementById(sectionID)
      if(!sectionEl) throw new Error()

      scrollSectionOffsetTop = sectionEl.offsetTop

      if (window.pageYOffset - this.offset >= scrollSectionOffsetTop && window.pageYOffset < scrollSectionOffsetTop + sectionEl.scrollHeight) {
        this.getNavLinkElement(sectionID).classList.add(this.activeNavClass)
        this.clearOtherNavLinkActiveStyle(sectionID)
      } else {
        this.getNavLinkElement(sectionID).classList.remove(this.activeNavClass)
      }

      if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight && index === this.scrollTargetIds.length - 1) {
        this.getNavLinkElement(sectionID).classList.add(this.activeNavClass)
        this.clearOtherNavLinkActiveStyle(sectionID)
      }
    })
  }

  easeInOutQuad(current_time: number, start: number, change: number, duration: number): number {
      current_time /= duration/2
      if (current_time < 1) return change/2*current_time*current_time + start
      current_time--
      return -change/2 * (current_time*(current_time-2) - 1) + start
  }

  scrollTo(start: number, to: number, duration: number): void {
    const change = to - start
    const increment = 10
    let currentTime = 0

    const animateScroll = () => {
        currentTime += increment
        const val = this.easeInOutQuad(currentTime, start, change, duration)
        window.scrollTo(0, val)
        if(currentTime < duration) {
            setTimeout(animateScroll, increment)
        }
    }

    animateScroll()
  }

  getNavLinkElement(sectionID: string): HTMLElement {
    const el = document.querySelector<HTMLElement>(`a[href='#${sectionID}']`)
    if(!el) throw new Error()
    return el
  }

  clearOtherNavLinkActiveStyle(excludeSectionID: string): void {
    this.scrollTargetIds.map((sectionID) => {
      if (sectionID !== excludeSectionID) {
        this.getNavLinkElement(sectionID).classList.remove(this.activeNavClass)
      }
    })
  }

  componentDidMount() {
    const aEl = document.querySelector<HTMLElement>(`a[href='${this.homeDefaultLink}']`)
    if (aEl) {
      aEl.addEventListener("click", (event: any) => {
        event.preventDefault()
        this.scrollTo(window.pageYOffset, 0, this.scrollDuration)
        window.location.hash = ""
      })
    }

    const listEl = document.querySelector("div[data-nav='list']")
    if(!listEl) throw new Error()

    const aEls = listEl.querySelectorAll("a") || []
    aEls.forEach( (navLink) => {
      navLink.addEventListener("click", (event) => {
        event.preventDefault()
        const sectionID = navLink.getAttribute("href")?.substr(1) || ''

        if(sectionID) {
          const sectionEl = document.getElementById(sectionID)
          if (sectionEl) {
            const scrollTargetPosition = sectionEl.offsetTop
            this.scrollTo(window.pageYOffset, scrollTargetPosition + this.offset, this.scrollDuration)
          }
        } else {
          this.scrollTo(window.pageYOffset, 0, this.scrollDuration)
        }
      })
    })

    window.addEventListener("scroll", this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll)
  }

  render() {
    return(
      <div data-nav="list">
        { this.props.children }
      </div>
    )
  }
}

export default NavBar
