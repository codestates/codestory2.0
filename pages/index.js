import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Landing from '../components/Landing';
import Footer from '../components/Footer';
import axios from 'axios';

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
      <Nav
        isLogin={isLogin}
        username={username}
      />
      <Landing
        loginClick={loginClick}
      />
      <Footer />
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