import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styles from '../styles/modules/landing.module.scss';

export default function Landing({ colorHandler }) {

  SwiperCore.use([Navigation, Pagination]);

  const [currentIdx, setCurrentIdx] = useState(0);

  const idxHandler = (idx) => {
    setCurrentIdx(idx.realIndex);
    colorHandler(idx.realIndex);
  };

  return (
    <div className={styles.background}>
      <Swiper
        slidesPerView={1}
        loop={true}
        navigation
        allowTouchMove={false}
        speed={600}
        onSlideChange={(idx) => idxHandler(idx)}
      >
        <div className={styles.box_btn}>
          <div className={currentIdx === 1 ? styles.btn_arrow_white : styles.btn_arrow}>&lt;</div>
          <div className={currentIdx === 1 ? styles.btn_arrow_white : styles.btn_arrow}>&gt;</div>
        </div>
        <SwiperSlide>
          <div className={styles.container}>
            <Link href='/linux' passHref>
              <button className={styles.btn_game}>Start Linux CLI</button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.container2}>
            <Link href='/css' passHref>
              <button className={styles.btn_game_white}>Start CSS</button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.container3}>
            <Link href='/' passHref>
              <button className={styles.btn_game}>Start JS</button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
