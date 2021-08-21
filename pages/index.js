import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Ranking from '../components/Ranking';
import { useState } from 'react';
import {axios} from 'axios';

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

export async function getServerSideProps(context) {
  try {
    console.log('ssr작동하니?');
    const { data } = await axios.get('api/user', { 
      headers: { cookie: `accessToken=${context.req.cookies.accessToken}` } 
    }).then((res) => res.json());
    console.log(data);
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