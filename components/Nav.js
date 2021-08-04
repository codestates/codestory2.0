import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
// import { useLocation } from 'react-router-dom';
import Link from 'next/link';
import axios from 'axios';

export default function Nav({ isLogin, username }) {

  const [isLoading, setIsLoading] = useState(false);
  // const location = useLocation();
  const router = useRouter();
  
  // useEffect(() => {
  //   if (location.pathname === '/gamestart') {
  //     if (isLogin === false) {
  //       setIsLoading(true);
  //     }
  //     if (isLogin === true) {
  //       setIsLoading(false);
  //     }
  //   }
  // }, [isLogin]);

  const logoutClick = async () => {
    await axios.get('/api/signout');
    router.push('/');
  };

  const scrollToBottom = () => {
    document.getElementById('__next').scrollIntoView({ block: 'end' });
  };

  return (
    <div id="nav-container">
      { isLogin
        ? <>
          <span id="title">
            <span id="name">{`반갑습니다 ${username}님!`}</span>
          </span>
          <div id="menu">  
            <Link href="/gamestart">
              <a><div className="btn">게임</div></a>
            </Link>
            <Link href="/ranking">
              <a><div className="btn">랭킹</div></a>
            </Link>
            <Link href="/profile">
              <a><div className="btn">프로필</div></a>
            </Link>
            <div id="btn-login" onClick={() => logoutClick()}>로그아웃</div>
          </div>
        </>
        : isLoading
          ? <>
            <span id="title">
              <span id="name">로딩중입니다</span>
              <div id="nav-loading">
                <div className="nav-loading-circle"></div>
                <div className="nav-loading-circle"></div>
                <div className="nav-loading-circle"></div>
              </div>
            </span>
            <div id="menu">  
              <div className="btn-loading"></div>
              <div className="btn-loading"></div>
              <div className="btn-loading"></div>
              <div className="btn-loading"></div>
            </div>
          </>
          : <>
            <span id="title"></span>
            <div id="menu">  
              <div className="btn">
                <div onClick={() => scrollToBottom()}>로그인</div>
              </div> 
            </div>
          </>
      }
    </div> 
  );
}