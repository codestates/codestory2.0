import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Pagination, Autoplay } from 'swiper';
import styles from '../styles/modules/login.module.scss';
import Image from 'next/image';
import btn_google from '../public/btn_google.svg';

export default function Login({ loginOpenHandler }) {

  SwiperCore.use([EffectFade, Pagination, Autoplay]);

  return (
    <div className={styles.background}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.slides}>
            <Swiper
              slidesPerView={1}
              loop={true}
              pagination
              speed={700}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false
              }}
            >
              <SwiperSlide>
                <div className={styles.page1}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.page2}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.page3}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.page4}></div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.box_right}>
            <div className={styles.btn_close}
              onClick={() => loginOpenHandler()}>
              <div className={styles.btn_close_bar}></div>
              <div className={styles.btn_close_bar}></div>
            </div>
            <span className={styles.word}>Sign In</span>
            <span className={styles.word2}>Welcome to Code Story!</span>
            <div className={styles.box_login}>
              <div className={styles.box_id}>
                <span className={styles.word_id}>Users name or Email</span>
                <input className={styles.input_id}></input>
              </div>
              <div className={styles.box_pw}>
                <span className={styles.word_pw}>Password</span>
                <input className={styles.input_pw} type={'password'}></input>
              </div>
              <div className={styles.btn_login}>Sign In</div>
              <Image
                src={btn_google}
                width="140"
                alt="btn_google"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}