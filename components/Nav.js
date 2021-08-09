import React from 'react';
import { useState } from 'react';
import styles from '../styles/modules/nav.module.scss';
import Image from 'next/image';

export default function Nav() {

  const [isOpen, setIsOpen] = useState(false);
  
  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={isOpen ? styles.background : null}>
        <button className={styles.btn_nav} onClick={openHandler}>
          <div className={styles.btn_nav_bar}></div>
          <div className={styles.btn_nav_bar}></div>
          <div className={styles.btn_nav_bar}></div>
        </button>
        {!isOpen
          ? null
          : 
          <div className={styles.container}>
            <div className={styles.menu}>
              <button className={styles.btn_about}>About</button>
              <button className={styles.btn_game}>Game</button>
              <button className={styles.btn_ranking}>Ranking</button>
              <button className={styles.btn_mypage}>My page</button>
              <button className={styles.btn_login}>Login</button>
            </div>
          </div> 
        }
      </div>  
    </>
  );
}