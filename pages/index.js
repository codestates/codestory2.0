import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import Landing from '../components/Landing';
import Footer from '../components/Footer';

export default function Home() {

  return (
    <Layout>
      <Landing />
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