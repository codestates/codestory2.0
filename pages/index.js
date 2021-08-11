import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Home() {

  const colorHandler = (e) => {
    if (e === 1) {
      setIsWhite(true);
    } else {
      setIsWhite(false);
    }
  };

  const [component, setComponent] = useState(<Landing colorHandler={colorHandler} />);
  const [isWhite, setIsWhite] = useState(false);
  
  const componentHandler = (e) => {
    setComponent(e);
  };

  return (
    <Layout>
      {component.type.name === 'Landing' ? <Landing colorHandler={colorHandler} /> : component}
      <Footer isWhite={isWhite}/>
      <Nav componentHandler={(e) => componentHandler(e)} 
        isWhite={isWhite}
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