import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styles from '../styles/modules/landing.module.scss';
import Landing_linux from './Landing_linux';
import Landing_automata from './Landing_automata';
import Landing_css from './Landing_css';

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
          <div className={currentIdx === 2 ? styles.btn_arrow_white : styles.btn_arrow}>&lt;</div>
          <div className={currentIdx === 2 ? styles.btn_arrow_white : styles.btn_arrow}>&gt;</div>
        </div>
        <SwiperSlide>
          <Landing_linux currentIdx={currentIdx}/>
        </SwiperSlide>
        <SwiperSlide>
          <Landing_automata currentIdx={currentIdx} />
        </SwiperSlide>
        <SwiperSlide>
          <Landing_css currentIdx={currentIdx} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}