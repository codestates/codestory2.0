import { useState } from 'react';
import SignUp from './SignUp';
import styles from './login.module.css';
import axios from 'axios';
import Image from 'next/image';
import loginGoogle from '../public/login-google.png';
import loginKakao from '../public/login-kakao.png';

export default function Login({loginClick}) {
  
  const serverUrl = 'https://api.codestory.academy';
  const kakaoClientId = 'ce992090812c730f2178949e1baac586';
  const googleClientId = '308904347249-t3ilrgtua2unljo0jgfv50iqihm4buja.apps.googleusercontent.com';
  const redirectUri = 'https://www.codestory.academy/gamestart';
  const kakaoLoginUrl = `https://Kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}&response_type=code`;
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;

  const [isSignup, setIsSignup] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  });
  
  const kakaoLoginHandler = async () => {
    window.location.assign(`${kakaoLoginUrl}`);
  };
  
  const googleLoginHandler = async () => {
    window.location.assign(`${googleLoginUrl}`);
  };
  
  const { username, password } = loginInfo;

  const inputValueHandler = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    if (loginInfo.username !== '' && loginInfo.password !== '') {
      setErrorMessage('');
    }
  };
  
  const loginHandler = async () => {
    if (username === '' || password === '') {
      setErrorMessage('아이디와 비밀번호 모두 입력해주세요');
    } else {
      await axios.post(serverUrl+'/signin', {
        username: username,
        password: password
      }, {
        'content-type': 'application/json',
        withCredentials: true
      }).then(() => {
        loginClick();
        history.push('/gamestart');
      }).catch(() => {
        setErrorMessage('회원정보가 존재하지 않습니다');
      });
    }
  };

  const signupHandler = () => {
    setIsSignup(!isSignup);
  };

  const onMouseOver = () => {
    setIsHover(true);
  };

  const onMouseOut = () => {
    setIsHover(false);
  };

  return (
    <>
      { isSignup
        ? <SignUp signupHandler={signupHandler} loginClick={loginClick}/>
        : <div className={styles.background}>
          <object className={styles.logo} type="image/svg+xml" data="logo.svg" aria-label="logo"></object>
          <div className={styles.container}>
            <div className={styles.wrapper}>
              <input className={styles.input_id} placeholder="아이디" onChange={inputValueHandler('username')}></input>
              <p className={styles.valid}>아이디를 입력해 주세요</p>
              <input className={styles.input_password} placeholder="비밀번호" type="password" onChange={inputValueHandler('password')}></input>
              <p className={styles.valid}>비밀번호를 입력해 주세요</p>
              <button className={styles.btn} onClick={loginHandler}>로그인</button>
              {
                errorMessage === ''
                  ? null
                  : <div className={styles.warn_box}>{errorMessage}</div>
              }
              <div className={styles.social}>
                <a className={styles.social_btn} onClick={googleLoginHandler}>
                  <Image className={styles.social_image} src={loginGoogle} alt="google"/>
                </a>
                <a className={styles.social_btn}  onClick={kakaoLoginHandler}>
                  <Image className={styles.social_image} src={loginKakao} alt="kakao"/>
                </a>
              </div>
              <a className={styles.signin} 
                onMouseOver={() => onMouseOver()}
                onMouseOut={() => onMouseOut()}
                onClick={signupHandler}>
                {
                  isHover
                    ? '회원가입 하러가기'
                    : '아직 아이디가 없으신가요?'
                }
              </a>
            </div>  
          </div>
        </div>
      }
    </>
  );
}