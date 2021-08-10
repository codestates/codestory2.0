import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Home() {

  const [component, setComponent] = useState(<Landing />);

  const componentHandler = (e) => {
    setComponent(e);
  };

  return (
    <Layout>
      <Nav componentHandler={(e) => componentHandler(e)}/>
      <Footer />
      {component}
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