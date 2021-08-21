import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Ranking from '../components/Ranking';
import Mypage from '../components/Mypage';
import { useState } from 'react';

export default function Home({ loginHandler, isLogin }) {

  const colorHandler = (e) => {
    if (e === 1) {
      setIsWhite(true);
    } else if (e === 0 || e === 2) {
      setIsWhite(false);
    }
  };

  const [component, setComponent] = useState(<Landing colorHandler={colorHandler} />);
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
        colorHandler={colorHandler}
        isLogin={isLogin}
        loginHandler={loginHandler}
      />
      {component.type.name === 'Landing' 
        ? <Landing colorHandler={colorHandler} /> 
        : component.type.name === 'Ranking' 
          ? <Ranking isLogin={isLogin} />
          : component.type.name === 'Mypage'
            ? <Mypage isLogin={isLogin} />
            : component
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