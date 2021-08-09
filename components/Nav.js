import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/modules/nav.module.scss';
import About from './about';
import Landing from './Landing';
import Ranking from './Ranking';
import Mypage from './Mypage';
import Login from './Login';

export default function Nav({ componentHandler }) {

  const [isOpen, setIsOpen] = useState(false);
  const [menuTl] = useState(gsap.timeline({ paused: true }));
  const menuBars = {};
  const { asPath } = useRouter();

  useEffect(() => {
    menuTl
      .to(menuBars.back, {
        duration: 0.25,
        x: -420,
        opacity: 1
      }, 0)
      .to(menuBars.topBar, {
        width: 30,
        duration: 0.2,
        backgroundColor: '#ffffff',
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
        backgroundColor: '#fffffff', 
        rotation: -45, 
        y: -9
      }, 0)
      .reverse();
  }, []);

  const openHandler = () => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
  };

  const clickHandler = (component) => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
    componentHandler(component);
  };

  return (
    <>
      <span className={styles.logo}>
        Code <br/> Story
      </span>
      <div className={isOpen ? styles.background : null}>
        <div className={styles.nav_box}>
          <button className={styles.btn_nav} 
            onClick={openHandler}
          >
            <div className={styles.btn_nav_bar} 
              ref={e => (menuBars['topBar'] = e)} />
            <div className={styles.btn_nav_bar}
              ref={e => (menuBars['middleBar'] = e)} />
            <div className={styles.btn_nav_bar}
              ref={e => (menuBars['bottomBar'] = e)} />
          </button>
          <div className={styles.container}
            ref={e => (menuBars['back'] = e)}
          >
            <div className={styles.menu}>
              <Link href='/' passHref>
                <button className={styles.btn_about}
                  onClick={asPath === '/' ? () => clickHandler(<Landing/>) : null}
                >Home</button>
              </Link> 
              <button className={styles.btn_about}
                onClick={() => clickHandler(<About/>)}
              >About</button>
              <Link href='/game' passHref>
                <button className={styles.btn_game}>Game</button>
              </Link>
              <button className={styles.btn_ranking}
                onClick={() => clickHandler(<Ranking/>)}
              >Ranking</button>
              <button className={styles.btn_mypage}
                onClick={() => clickHandler(<Mypage/>)}
              >My page</button>
              <button className={styles.btn_login}
                onClick={() => clickHandler(<Login/>)}
              >Login</button>
            </div>
          </div> 
        </div>
      </div>  
    </>
  );
}