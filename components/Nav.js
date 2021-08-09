import React from 'react';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import styles from '../styles/modules/nav.module.scss';

export default function Nav() {

  const [isOpen, setIsOpen] = useState(false);
  const [menuTl] = useState(gsap.timeline({ paused: true }));
  const menuBars = {};
  
  const openHandler = () => {
    setIsOpen(!isOpen);
    menuTl.reversed(!menuTl.reversed());
  };

  useEffect(() => {
    menuTl
      .to(menuBars.back, {
        duration: 0.2,
        x: -420,
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

  return (
    <>
      <div className={styles.logo}>
        <Image
          src="/logotype.svg"
          alt="Logo type"
          width={115}
          height={90}
        />
      </div>
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
              ref={e => (menuBars['bottomBar'] = e)}/>
          </button>
          <div className={styles.container} 
            ref={e => (menuBars['back'] = e)}
          >
            <div className={styles.menu}>
              <button className={styles.btn_about}>About</button>
              <button className={styles.btn_game}>Game</button>
              <button className={styles.btn_ranking}>Ranking</button>
              <button className={styles.btn_mypage}>My page</button>
              <button className={styles.btn_login}>Login</button>
            </div>
          </div> 
        </div>
      </div>  
    </>
  );
}