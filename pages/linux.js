import Layout from '../components/Layout';
import Nav from '../components/Nav';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/game.module.scss';
import Script from 'next/script';
import fs from 'fs'; // local 확인 시 활성
// import axios from 'axios'; // local 확인 시 주석

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
        <div className={styles.tips}>
          <Tips />
        </div>
        <div className={styles.gamefooter}>
          <GameFooter /> 
        </div>
      </div>
      <Script>{game}</Script>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const game = fs.readFileSync('games/linux/main.js', { encoding: 'utf8' }); // local 확인 시 활성
  // const res = await axios.get('https://feat-amplify-deploy.drl7u5zwhcbcc.amplifyapp.com/games/linux/main.js'); // local 확인 시 주석
  // const game = res.data; //local 확인 시 주석
  return {
    props: { game }
  };
}