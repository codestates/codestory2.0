import Layout from '../components/Layout';
import Nav from '../components/Nav';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/game.module.scss';
import Script from 'next/script';
import fs from 'fs';

export default function Linux({ game }) {
  return (
    <Layout>
      <div
        id="game_container"
        style={{
          position: 'absolute',
          left: '360px',
          top: '82.1px',
          width: '720px',
          height: '672.8px',
          zIndex: 1
        }}
      />
      <div className={styles.container}>
        <div className={styles.header}>
          <Nav />
        </div>
        <Tips />
        <GameFooter /> 
      </div>
      <Script>{game}</Script>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const game = fs.readFileSync('games/linux/main.js', { encoding: 'utf8' });
  return {
    props: { game }
  };
}