import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Landing from '../components/Landing';
import Footer from '../components/Footer';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileError from '../components/MobileError';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Home({ isLogin, username }) {

  const [userInfo, setUserInfo] = useState({
    username: '',
    photourl: '',
    coin: 0,
    intro: '',
    ranking: 0,
    follower: 0,
    following: 0
  });

  // useEffect(() => {
  //   (async () => {
  //     const result = await axios.post('/api/signin', { username: '강래준', password: '12345678' });
  //     console.log(result.data);
  //   })();
  // }, []);

  const loginClick = () => {
    setIsLogin(true);
  };

  return (
    <Layout>
      <MobileView>
        <MobileError />
      </MobileView>
      <BrowserView>
        <Nav
          isLogin={isLogin}
          username={username}
        />
        <Landing
          loginClick={loginClick}
        />
        <Footer />
        {/* <Route path="/gamestart">
          <GameStart
            loginClick={loginClick}
            setIsLogin={setIsLogin}
          />
        </Route>
        <Route path="/ranking">
          <Ranking
            ranking={ranking}
            rankingHandler={rankingHandler}
          />
        </Route>
        <Route path="/profile">
          <Profile
            userInfo={userInfo}
            userView={userView}
            followingList={followingList}
            ranking={ranking}
            rankingHandler={rankingHandler}
          />
        </Route>
        <Route path="/game">
          <Game
            userInfo={userInfo}
            userView={userView}
            rankingHandler={rankingHandler}
          />
  </Route>*/}
      </BrowserView>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get('http://localhost:3000/api/user', { headers: { cookie: `accessToken=${context.req.cookies.accessToken}` } });
    return {
      props: {
        isLogin: true,
        username: data.username
      }
    };
  }
  catch {
    return {
      props: {
        isLogin: false
      }
    };
  }
}