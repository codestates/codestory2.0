import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styles from '../styles/modules/login.module.scss';

export default function Login({ isWhite, loginOpenHandler }) {

  SwiperCore.use([Navigation, Pagination]);

  return (
    <div className={isWhite? styles.background_white : styles.background} 
      onClick={() => loginOpenHandler()}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.slides}>
            <Swiper
              slidesPerView={1}
              loop={true}
              navigation
              pagination
              speed={600}
            >
              <SwiperSlide>
                <div className={styles.page1}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.page2}></div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className={styles.login_box}>
            <span className={styles.word}>로그인 영역 입니다.</span>
          </div>
        </div>
      </div>
    </div>
  );
}