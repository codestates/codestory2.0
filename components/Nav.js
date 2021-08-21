import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/modules/nav.module.scss';
import About from './About';
import Landing from './Landing';
import Ranking from './Ranking';
import Mypage from './Mypage';

export default function Nav({ componentHandler, isWhite, loginOpenHandler, colorHandler, isLogin, loginHandler }) {

  const serverUrl = 'https://api.codestory.academy';

  const [isOpen, setIsOpen] = useState(false);
  const [menuTl] = useState(gsap.timeline({ paused: true }));
  const menuBars = {};
  const router = useRouter();

  useEffect(() => {
    menuTl
      .to(menuBars.back, {
        duration: 0.25,
        width: 420,
        opacity: 1
      }, 0)
      .to(menuBars.topBar, {
        width: 30,
        duration: 0.2,
        rotation: 45,
        y: 9
      }, 0)
      .to(menuBars.middleBar, { 
        duration: 0.2, 
        alpha: 0 
      }, 0)
      .to(menuBars.bottomBar,{ 
        width: 30,
        duration: 0.2,  
        rotation: -45, 
        y: -9
      }, 0)
      .reverse();
  }, [
    menuBars.back,
    menuBars.bottomBar,
    menuBars.middleBar,
    menuBars.topBar,
    menuTl
  ]);

  const openHandler = () => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
  };

  const navClickHandler = (component) => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
    componentHandler(component);
    if (component[0] !== 'Landing') {
      colorHandler(1);
    }
  };

  const logoClickHandler = (component) => {
    componentHandler(component);
  };

  const logoutHandler = (component) => {
    axios.get('api/signout', { withCredentials: true });
    loginHandler(false);
    componentHandler(component);
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
  };

  const loginClickHandler = () => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
    loginOpenHandler();
  };

  return (
    <>
      <Link href='/' passHref>
        <span className={isWhite ? styles.logo_white : styles.logo} 
          onClick={router.pathname === '/' 
            ? () => logoClickHandler(
              [ 'Landing', <Landing colorHandler={colorHandler} key={0} /> ]
            ) 
            : null
          }
        >
          Code<br/>Story
        </span>
      </Link>
      <div className={isOpen 
        ? isWhite 
          ? styles.background_white 
          : styles.background 
        : null}
      >
        <div className={styles.nav_box}>
          <button className={isWhite ? styles.btn_nav_white : styles.btn_nav} 
            onClick={openHandler}
          >
            <div className={isWhite ? styles.btn_nav_bar_white : styles.btn_nav_bar} 
              ref={e => (menuBars['topBar'] = e)} />
            <div className={isWhite ? styles.btn_nav_bar_white : styles.btn_nav_bar}
              ref={e => (menuBars['middleBar'] = e)} />
            <div className={isWhite ? styles.btn_nav_bar_white : styles.btn_nav_bar}
              ref={e => (menuBars['bottomBar'] = e)} />
          </button>
          <div className={isWhite ? styles.container_white : styles.container}
            ref={e => (menuBars['back'] = e)}
          >
            <div className={styles.menu_box}
              style={isOpen 
                ? { display: 'block' } 
                : null}>
              <div className={styles.menu} 
                style={isOpen 
                  ? { opacity: 1 } 
                  : null}
              >
                <Link href="/" passHref>
                  <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                    onClick={router.pathname === '/'
                      ? () => navClickHandler(
                        [ 'Landing', <Landing colorHandler={colorHandler} key={0} /> ]
                      )
                      : null
                    }
                  >Home</button>
                </Link> 
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={() => navClickHandler(
                    [ 'About', <About key={1} /> ]
                  )}
                >About</button>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={() => navClickHandler(
                    [ 'Ranking', <Ranking key={2} /> ]
                  )}
                >Ranking</button>
                {isLogin 
                  ? <>
                    <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                      onClick={() => navClickHandler(                    
                        [ 'Mypage', <Mypage key={3} /> ]
                      )}
                    >My page</button>
                    <Link href="/" passHref>
                      <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                        onClick={() => logoutHandler(
                          [ 'Landing', <Landing colorHandler={colorHandler} key={0} /> ]
                        )}
                      >Logout</button>
                    </Link>
                  </>
                  : <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                    onClick={() => loginClickHandler()}
                  >Login</button>
                }
              </div>
            </div> 
          </div>
        </div>
      </div>  
    </>
  );
}