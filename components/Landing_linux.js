import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap, { Power4 } from 'gsap';
import styles from '../styles/modules/landing_linux.module.scss';
import linux from '../public/linux.gif';
import tips from '../public/tips.gif';

export default function Landing_linux({ currentIdx }) {

  const [textTl] = useState(gsap.timeline({ repeat: -1 , overwrite: 'auto' }));
  const text = {};

  useEffect(() => {
    if (currentIdx === 0) {
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
            Linux CLI
          </span>
        </div>
        <div className={styles.img}
          ref={e => (text['img1'] = e)}
        >
          <Image 
            src={linux}
            width="520"
            height="600"
            alt="linux_game"
          />
        </div>
        <div className={styles.box_word2}
          ref={e => (text['box2'] = e)}
        >
          <span className={styles.word3}
            ref={e => (text['text3'] = e)}
          >
            실제 CLI 명령어로
          </span>
          <span className={styles.word4}
            ref={e => (text['text4'] = e)}
          >
            학습을 진행합니다
          </span>
        </div>
        <div className={styles.img2}
          ref={e => (text['img2'] = e)}
        >
          <Image 
            src={tips}
            width="450"
            height="300"
            alt="linux_tips"
          />
        </div>
      </div>
      <Link href="/linux" passHref>
        <button className={styles.btn_game}>Play Linux CLI</button>
      </Link>
    </div>
  );
}
