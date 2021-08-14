import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import { useState } from 'react';

export default function Home() {

  const [isWhite, setIsWhite] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const colorHandler = (e) => {
    if (e === 1) {
      setIsWhite(true);
    } else {
      setIsWhite(false);
    }
  };

  const loginOpenHandler = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <Layout>
      <Landing colorHandler={colorHandler} />
      {isLoginOpen ? <Login loginOpenHandler={loginOpenHandler}/> : null}
      <Footer isWhite={isWhite}/>
      <Nav isWhite={isWhite}
        loginOpenHandler={loginOpenHandler}
      />
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