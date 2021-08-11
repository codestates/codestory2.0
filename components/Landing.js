import React, { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styles from '../styles/modules/landing.module.scss';


export default function Landing({ colorHandler }) {

  SwiperCore.use([Navigation, Pagination]);

  const [currentIdx, setCurrentIdx] = useState(0);

  const idxHandler = (idx) => {
    setCurrentIdx(idx);
    colorHandler(idx);
  };

  return (
    <div className={styles.background}>
      <Swiper
        slidesPerView={1}
        loop={true}
        navigation
        speed={600}
        onSlideChange={(e) => idxHandler(e.realIndex)}
      >
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
              <button className={styles.btn_game}>Start CSS</button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}