import Layout from '../components/Layout';
import Script from 'next/script';
import Head from 'next/head';

export default function CSS() {
  return (
    <Layout>
      <Head>
        <script src="//cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js" defer />
      </Head>
      <div
        id="game"
        style={{
          width: '720px',
          height: '672.8px',
          position: 'relative',
          left: '360px',
          top: '82.1px'
        }}
      />
      <Script src="/api/css" />
    </Layout>
  );
};