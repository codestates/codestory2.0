import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Home() {

  const [component, setComponent] = useState(<Landing />);
  const [isWhite, setIsWhite] = useState(false);

  console.log(component.type.name);

  const componentHandler = (e) => {
    setComponent(e);
  };

  const colorHandler = (e) => {
    if (e === 1) {
      setIsWhite(true);
    } else {
      setIsWhite(false);
    }
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