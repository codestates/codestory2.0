import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Ranking from '../components/Ranking';
import Mypage from '../components/Mypage';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home({ loginHandler, isLogin }) {

  const colorHandler = (e) => {
    if (e === 1) {
      setIsWhite(true);
    } else if (e === 0 || e === 2) {
      setIsWhite(false);
    }
  };

  const [component, setComponent] = useState(
    [ 'Landing', <Landing colorHandler={colorHandler} key={0} /> ]
  );
  const [isWhite, setIsWhite] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
 
  useEffect(() => {
    if (process.browser) {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get('code'); 
      async function getAccessToken() {
        if (authorizationCode) {
          const res = await axios.post('api/oauthlogin',
            { authorizationCode: authorizationCode }, {
              'content-type': 'application/json',
              withCredentials: true
            });
          if (res.data.message === 'ok') {
            loginHandler();
          }
        }
      }
      getAccessToken();
    } 
  },[]);
  
  const componentHandler = (e) => {
    setComponent(e);
  };

  const loginOpenHandler = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <Layout>
      <Nav componentHandler={(e) => componentHandler(e)} 
        isWhite={isWhite}
        loginOpenHandler={loginOpenHandler}
        colorHandler={(e) => colorHandler(e)}
        isLogin={isLogin}
        loginHandler={loginHandler}
      />
      {component[0] === 'Landing' 
        ? <Landing colorHandler={colorHandler} key={0} />
        : component[0] === 'Ranking' 
          ? <Ranking isLogin={isLogin} />
          : component[0] === 'Mypage'
            ? <Mypage isLogin={isLogin} />
            : component[1]
      }
      {isLoginOpen 
        ? <Login isWhite={isWhite} 
          loginOpenHandler={loginOpenHandler}
          loginHandler={loginHandler}
        /> 
        : null
      }
      <Footer isWhite={isWhite}/>
    </Layout>
  );
}

export async function getStaticProps(context) {
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