import Layout from '../components/Layout';
import Script from 'next/script';
import fs from 'fs';

export default function Game({ game }) {
  return (
    <Layout>
      <Script>{game}</Script>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const game = fs.readFileSync('games/linux.js', { encoding: 'utf8' });
  return {
    props: { game }
  };
}