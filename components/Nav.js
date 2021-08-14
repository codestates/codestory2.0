import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/modules/nav.module.scss';

export default function Nav({ isWhite, loginOpenHandler }) {

  const [isOpen, setIsOpen] = useState(false);
  const [menuTl] = useState(gsap.timeline({ paused: true }));
  const menuBars = {};

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

  const clickHandler = () => {
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
        <span className={isWhite ? styles.logo_white : styles.logo}>
          Code<br/>Story
        </span>
      </Link>
      <div className={isOpen ? isWhite ? styles.background_white : styles.background : null}>
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
            <div className={styles.menu}>
              <Link href='/' passHref>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={clickHandler}>
                  Home
                </button>
              </Link> 
              <Link href='/about' passHref>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={clickHandler}>
                  About
                </button>
              </Link>
              <Link href='/ranking' passHref>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={clickHandler}>
                  Ranking
                </button>
              </Link>
              <Link href='/mypage' passHref>
                <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                  onClick={clickHandler}>
                  My Page
                </button>
              </Link>
              <button className={isWhite ? styles.btn_word_white : styles.btn_word}
                onClick={() => loginClickHandler()}
              >Login</button>
            </div>
          </div> 
        </div>
      </div>  
    </>
  );
}