import React, { useEffect, useState } from 'react';
import gsap, { Power4 } from 'gsap';
import styles from '../styles/modules/about.module.scss';

export default function About() {

  const [textTl] = useState(gsap.timeline({ repeat: -1 }));
  const text = {};

  useEffect(() => {
    textTl
      .to(text.text1, {
        duration: 2,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text2, {
        duration: 2,
        delay: 1,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text3, {
        duration: 2,
        delay: 2,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text1, {
        duration: 1,
        delay: 4,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text2, {
        duration: 1,
        delay: 5,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text3, {
        duration: 1,
        delay: 6,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.box1, {
        delay: 7,
        display: 'none',
        ease: Power4.easeOut,
      }, 0)
      .to(text.box2, {
        delay: 7,
        display: 'flex',
        ease: Power4.easeOut,
      }, 0)
      .to(text.text4, {
        duration: 1,
        delay: 8,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text5, {
        duration: 1,
        delay: 9,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text6, {
        duration: 1,
        delay: 10,
        opacity: 1,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text4, {
        duration: 1,
        delay: 12,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text5, {
        duration: 1,
        delay: 13,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.text6, {
        duration: 1,
        delay: 14,
        opacity: 0,
        y: 15,
        ease: Power4.easeOut,
      }, 0)
      .to(text.box2, {
        delay: 16,
        display: 'none',
        ease: Power4.easeOut,
      }, 0); 
  });
  
  return (
    <div className={styles.container}>
      <span className={styles.title}>About</span>
      <div className={styles.box_word1}
        ref={e => (text['box1'] = e)}
      >
        <span className={styles.word1}
          ref={e => (text['text1'] = e)}
        >
          CodeStory는
        </span>
        <span className={styles.word2}
          ref={e => (text['text2'] = e)}
        >
          다양한 코딩 기초를 연습하고
        </span>
        <span className={styles.word3}
          ref={e => (text['text3'] = e)}
        >
          개발자가 되기 위한 학습 게임을 제공합니다.
        </span>
      </div>
      <div className={styles.box_word2}
        ref={e => (text['box2'] = e)}
      >
        <span className={styles.word3}
          ref={e => (text['text4'] = e)}
        >
          자신의 실력을 한 번 테스트해보세요.
        </span>
        <span className={styles.word3}
          ref={e => (text['text5'] = e)}
        >
          CodeStory가 여러분의 개발 스토리에
        </span>
        <span className={styles.word3}
          ref={e => (text['text6'] = e)}
        >
          한 챕터를 채워 줄 것입니다.
        </span>
      </div>
    </div>
  );
}
