import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Pagination, Autoplay } from 'swiper';
import axios from 'axios';
import styles from '../styles/modules/login.module.scss';
import Image from 'next/image';
import btn_google from '../public/btn_google.svg';

export default function Login({ loginOpenHandler, loginHandler }) {

  SwiperCore.use([EffectFade, Pagination, Autoplay]);

  const serverUrl = 'https://api.codestory.academy';
  const googleClientId = '308904347249-t3ilrgtua2unljo0jgfv50iqihm4buja.apps.googleusercontent.com';
  const redirectUri = 'https://www.codestory.academy/gamestart';
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;

  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFinish, setIsFinish] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });
  const [signUpInfo, setSignUpInfo] = useState({
    userId: '',
    password1: '',
    password2: '',
  });

  const { username, password } = loginInfo;
  const { userId, password1, password2 } = signUpInfo;

  const inputValueHandler = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    if (loginInfo.username !== '' && loginInfo.password !== '') {
      setErrorMessage('');
    }
  };

  const inputSignUpHandler = (key) => (e) => {
    setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    if (signUpInfo.userId !== '' && signUpInfo.password1 !== '' && signUpInfo.password2 !== '') {
      setErrorMessage('');
    }
  };

  const login = async () => {
    if (username === '' || password === '') {
      setErrorMessage('아이디와 비밀번호를 확인해 주세요');
    } else {
      await axios.post(serverUrl+'/signin', {
        username: username,
        password: password
      }, {
        'content-type': 'application/json',
        withCredentials: true
      }).then(() => {
        loginHandler();
        loginOpenHandler(false);
      }).catch(() => {
        setErrorMessage('회원정보가 존재하지 않습니다');
      });
    }
  };

  const signupHandler = () => {
    setIsSignup(!isSignup);
  };

  const signup = async () => {
    if (userId === '' || password1 === '' || password2 === '') {
      setErrorMessage('아이디와 비밀번호를 입력해 주세요'); 
    } else if (password1 !== password2) {
      setErrorMessage('비밀번호를 확인해 주세요');
    } else {
      await axios.post(serverUrl+'/user', {
        username: userId,
        password: password2
      }, {
        'content-type': 'application/json',
        withCredentials: true
      }).then(() => {
        setIsFinish(true);
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const googleLogin = async () => {
    window.location.assign(`${googleLoginUrl}`);
  };

  const finishHandler = () => {
    signupHandler(false);
    setIsFinish(false);
  };

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
          {isSignup 
            ? <div className={styles.box_right}> 
              <div className={styles.btn_close}
                onClick={() => loginOpenHandler()}>
                <div className={styles.btn_close_bar}></div>
                <div className={styles.btn_close_bar}></div>
              </div>
              {isFinish 
                ? <>
                  <div className={styles.word_finish}>
                  회원가입이 완료되었습니다
                  </div>
                  <div className={styles.signup}
                    onClick={() => finishHandler()}>
                    로그인 하러가기
                  </div>
                </>
                : <>
                  <span className={styles.word}>Sign Up</span>
                  <span className={styles.word2}>Welcome to Code Story!</span>
                  <div className={styles.box_login}>
                    <div className={styles.box_id}>
                      <span className={styles.word_id}>Users name or Email</span>
                      <input className={styles.input_id} 
                        onChange={inputSignUpHandler('userId')}
                      >
                      </input>
                    </div>
                    <div className={styles.box_pw2}>
                      <span className={styles.word_pw}>Password</span>
                      <input className={styles.input_pw}
                        type={'password'}
                        onChange={inputSignUpHandler('password1')}
                      ></input>
                    </div>
                    <div className={styles.box_pw}>
                      <span className={styles.word_pw}>Confirm Password</span>
                      <input className={styles.input_pw}
                        type={'password'}
                        onChange={inputSignUpHandler('password2')}
                      ></input>
                      <div className={styles.word_error}>
                        {errorMessage}
                      </div>
                    </div>
                    <div className={styles.btn_signup} 
                      onClick={() => signup()}
                    >Sign Up</div>
                    <div className={styles.signup}
                      onClick={() => signupHandler()}>
                      이미 아이디가 있으신가요?
                    </div>
                  </div>  
                </>
              }
            </div>
            : <div className={styles.box_right}>
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
                  <input className={styles.input_id} 
                    onChange={inputValueHandler('username')}
                  >
                  </input>
                </div>
                <div className={styles.box_pw}>
                  <span className={styles.word_pw}>Password</span>
                  <input className={styles.input_pw}
                    type={'password'}
                    onChange={inputValueHandler('password')}
                  ></input>
                  <div className={styles.word_error}>
                    {errorMessage}
                  </div>
                </div>
                <div className={styles.btn_login} 
                  onClick={() => login()}
                >Sign In</div>
                <Image
                  src={btn_google}
                  width="140"
                  alt="btn_google"
                  onClick={() => googleLogin()}
                />
                <div className={styles.signup}
                  onClick={() => signupHandler()}>
                  회원가입 하러가기
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}