import Layout from '../components/Layout';
import { useEffect } from 'react';

export default function CSS() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/api/css';
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <div
        id="game_container"
        style={{
          width: '720px',
          height: '672.8px',
          position: 'relative',
          left: '360px',
          top: '82.1px'
        }}
      />
    </Layout>
  );
};