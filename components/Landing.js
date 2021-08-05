import { useEffect, useState } from 'react';
import Login from '../components/Login';
import styles from './landing.module.css';

export default function Landing({ loginClick }) {

  const [isVisible, setIsVisible] = useState(false);
  const [y, setY] = useState(null);

  useEffect(() => {
    window.addEventListener('scroll', (e) => handleNavigation(e));
    return () => { 
      window.removeEventListener('scroll', (e) => handleNavigation(e));
    };
  }, [y]);
  
  const handleNavigation = (e) => {
    const window = e.currentTarget.scrollY;
    if (window >= 650 && window < 2000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setY(window.scrollY);
  };

  const scrollToBottom = () => {
    document.getElementById('__next').scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  
  const move1 = () => {
    window.scrollTo({
      top: document.getElementById('landing-page-2').offsetHeight,
      behavior: 'smooth'
    });
  };
  
  const move2 = () => {
    window.scrollTo({
      top: (document.getElementById('landing-page-3').offsetHeight) * 2,
      behavior: 'smooth'
    });
  };
  
  const move3 = () => {
    window.scrollTo({
      top: document.getElementById('landing-page-4').offsetHeight * 3,
      behavior: 'smooth'
    });
  };
  
  const fadeIn = {
    opacity: 1,
    transition: '.5s'
  };

  const fadeOut = {
    opacity: 0,
    transition: '.5s'
  };

  return (
    <div className={styles.container}>
      <div className={styles.page_1}>
        <div className={styles.logo_box} onClick={move1}>
          <object className={`${styles.logo} wow pulse animate__slower`} type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
        </div>
      </div>
      <div id="landing-page-2" className={styles.page_2}>
        <div className={`${styles.word} wow pulse`} onClick={move2}>아직도 코딩을 공부하고 계신가요?</div>
        <button
          className={styles.btn}
          style={isVisible
            ? fadeIn
            : fadeOut}
          onClick={() => scrollToBottom()}
        >
          로그인 하러가기
          <span className={`material-icons ${styles.btn_arrow}`}>expand_more</span>
        </button>
      </div>
      <div id="landing-page-3" className={styles.page_3}>
        <div className={`${styles.word} wow pulse`} onClick={move3}>혹시 코딩 공부를 더 재미있게 하고 싶진 않으신가요?</div>
      </div>
      <div id="landing-page-4" className={styles.page_4}>
        <div className={`${styles.word} wow pulse`} onClick={scrollToBottom}>스토리로 배우는 코딩! CodeStory와 함께하세요</div>
      </div>
      <div className={styles.page_5}>
        <Login loginClick={loginClick}/>
      </div>
    </div>
  );
}