import Layout from '../components/Layout';
import Script from 'next/script';

export default function CSS() {
  return (
    <Layout>
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