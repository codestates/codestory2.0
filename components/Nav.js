import React from 'react';
import { useState } from 'react';
import styles from './nav.module.css';
import Image from 'next/image';

export default function Nav() {

  const [isOpen, setIsOpen] = useState(false);
  
  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen
        ? <div className={styles.background_close}>
          <Image
            className={styles.nav_img}
            src="/menu.svg"
            alt="Nav"
            width={65}
            height={65}
            onClick={openHandler}
          />
        </div>
        : <div className={styles.background_open}>
          <div className={styles.container}>
            <button className={styles.btn_close} onClick={openHandler}>&times;</button>
            <div className={styles.menu}>
              <button className={styles.btn_about}>About</button>
              <button className={styles.btn_game}>Game</button>
              <button className={styles.btn_ranking}>Ranking</button>
              <button className={styles.btn_mypage}>My page</button>
              <button className={styles.btn_login}>Login</button>
            </div>
            <div className={styles.space}></div>
          </div> 
        </div>  
      }
    </>
  );
}