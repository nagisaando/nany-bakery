import Link from 'next/link'
import React, {useState} from 'react'
import {CSSTransition} from 'react-transition-group'

const Navigation = ({blok}) => {
  const [menuOpen, setMenu] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const nodeRef = React.useRef(null)

  const buttonHandler = () => {
    setMenu((current) => !current)
  }
  React.useEffect(() => {
    if (menuOpen) {
      disableScroll()
    } else {
      enableScroll()
    }
  }, [menuOpen])
  const links = () => {
    return blok.body[0].link_list.map((el, i) => (
      <li key={i}>
        <Link href={`/${el.link.cached_url}`}>
          <a className="block md:inline | my-5 md:my-0 | text-4xl md:text-lg font-light">
            {el.display_name}
          </a>
        </Link>
      </li>
    ))
  }

  function disableScroll() {
    const body = document.querySelector('body')
    setScrollPosition(window.pageYOffset)
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollPosition}px`
    body.style.width = '100%'
  }
  function enableScroll() {
    const body = document.querySelector('body')
    body.style.removeProperty('overflow')
    body.style.removeProperty('position')
    body.style.removeProperty('top')
    body.style.removeProperty('width')
    window.scrollTo(0, scrollPosition)
  }

  return (
    <header className="w-full absolute top-0 left-0">
      <nav role="navigation">
        <div className={`container | mx-auto | px-5 py-7 md:py-10 md:px-10 | relative z-20`}>
          <button
            className={`flex md:hidden menu-btn | ${menuOpen ? 'open' : ''}`}
            onClick={buttonHandler}
          >
            <div className="menu-btn__burger"></div>
          </button>

          <ul className="hidden md:flex gap-x-4 | ">{links()}</ul>
          <img
            src={`${blok.body[1].image}/m/fit-in/70x70/`}
            alt={blok.body[1].alt_name}
            className="absolute | left-1/2 top-1/2 transform -translate-x-1/2  -translate-y-1/2"
          />
        </div>
        {/* mobole menu*/}
        <CSSTransition
          in={menuOpen}
          nodeRef={nodeRef}
          classNames="my-node"
          timeout={{enter: 200, exit: 200}}
        >
          <div
            className={`fixed top-0 left-0 | bg-white | h-screen w-screen z-10 ${
              menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            ref={nodeRef}
          >
            <CSSTransition
              in={menuOpen}
              nodeRef={nodeRef}
              classNames="link"
              timeout={{enter: 200, exit: 200}}
            >
              <ul className="flex flex-1 flex-grow flex-col items-center justify-center | h-full">
                {links()}
              </ul>
            </CSSTransition>
          </div>
        </CSSTransition>
      </nav>
      <style jsx>{`
        .menu-btn {
          position: relative;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          cursor: pointer;
          transition: all 0.1s ease-in-out;
        }
        .menu-btn__burger {
          box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
          transition: all 0.1s ease-in-out;
        }
        .menu-btn__burger::before,
        .menu-btn__burger::after {
          content: '';
          position: absolute;
          width: 35px;
          height: 1px;
          background: #000;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
          transition: all 0.1s ease-in-out;
        }
        .menu-btn__burger::before {
          transform: translateY(-8px);
        }
        .menu-btn__burger::after {
          transform: translateY(8px);
        }
        /* ANIMATION */
        .menu-btn.open .menu-btn__burger {
          transform: translateX(-50px);
          background: transparent;
          box-shadow: none;
        }
        .menu-btn.open .menu-btn__burger::before {
          transform: rotate(45deg) translate(35px, -35px);
        }
        .menu-btn.open .menu-btn__burger::after {
          transform: rotate(-45deg) translate(35px, 35px);
        }
        .my-node-enter {
          opacity: 0;
        }
        .my-node-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .my-node-exit {
          opacity: 1;
          ransition: opacity 200ms;
        }
        .my-node-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
        .link-enter {
          opacity: 0;
          transform: translateY(5px);
        }
        .link-enter-active {
          opacity: 1;
          transform: translateY(0px);
          transition: all 200ms;
        }
        .link-exit {
          opacity: 1;
          transform: translateY(0px);
          ransition: all 200ms;
        }
        .link-exit-active {
          opacity: 0;
          transform: translateY(5px);
          transition: all 200ms;
        }
      `}</style>
    </header>
  )
}

export default Navigation
