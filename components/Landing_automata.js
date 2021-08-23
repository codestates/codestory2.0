import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import gsap, { Power4 } from 'gsap';
import styles from '../styles/modules/landing_automata.module.scss';

export default function Landing_automata({ currentIdx }) {

  const [textTl] = useState(gsap.timeline({ repeat: -1 , overwrite: 'auto' }));
  const text = {};

  useEffect(() => {
    if (currentIdx === 1) {
      textTl
        .restart(true, true)
        .from(text.box1, {
          opacity: 1,
          display: 'flex',
          ease: Power4.easeOut,
        }, 0)
        .from(text.img1, {
          display: 'block',
          ease: Power4.easeOut,
        }, 0)
        .to(text.img1, {
          duration: 2,
          delay: 1,
          opacity: 1,
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.text1, {
          duration: 2,
          delay: 2,
          opacity: 1,
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.text2, {
          duration: 2,
          delay: 3,
          opacity: 1,
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.box1, {
          duration: 1,
          delay: 7,
          opacity: 0,
          display: 'none',
          ease: Power4.easeOut,
        }, 0)
        .to(text.img1, {
          duration: 1,
          delay: 7,
          opacity: 0,
          display: 'none',
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.box2, {
          opacity: 1,
          delay: 8,
          display: 'flex',
          ease: Power4.easeOut,
        }, 0)
        .to(text.img2, {
          delay: 8,
          display: 'block',
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.text3, {
          duration: 2,
          delay: 8,
          opacity: 1,
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.text4, {
          duration: 2,
          delay: 9,
          opacity: 1,
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.img2, {
          duration: 2,
          delay: 10,
          opacity: 1,
          y: 15,
          ease: Power4.easeOut,
        }, 0)
        .to(text.box2, {
          duration: 1,
          delay: 15,
          opacity: 0,
          display: 'none',
          ease: Power4.easeOut,
        }, 0)
        .to(text.img2, {
          duration: 1,
          delay: 15,
          opacity: 0,
          display: 'none',
          y: 15,
          ease: Power4.easeOut,
        }, 0);
    } else {
      textTl.kill();
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.box_word1}
          ref={e => (text['box1'] = e)}
        >
          <span className={styles.word1}
            ref={e => (text['text1'] = e)}
          >
            게임으로 배우는
          </span>
          <span className={styles.word2}
            ref={e => (text['text2'] = e)}
          >
            Automata
          </span>
        </div>
        <div className={styles.img}
          ref={e => (text['img1'] = e)}
        >
        </div>
        <div className={styles.box_word2}
          ref={e => (text['box2'] = e)}
        >
          <span className={styles.word3}
            ref={e => (text['text3'] = e)}
          >
            알고리즘 능력을
          </span>
          <span className={styles.word4}
            ref={e => (text['text4'] = e)}
          >
            키워보세요
          </span>
        </div>
        <div className={styles.img2}
          ref={e => (text['img2'] = e)}
        >
        </div>
      </div>
      <Link href="/automata" passHref>
        <button className={styles.btn_game}>Play Automata</button>
      </Link>
    </div>
  );
}