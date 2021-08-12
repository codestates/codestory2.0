import Layout from '../components/Layout';
import Nav from '../components/Nav';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/game.module.scss';
import Script from 'next/script';
// import fs from 'fs'; //local 확인 시 활성
import axios from 'axios'; //local 확인 시 주석

export default function Linux({ game }) {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Nav />
        </div>
        <div className={styles.game}>
          <div
            id="game_container"
            style={{
              width: '670px',
              height: '720px',
              zIndex: 1
            }}
          />
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
  // const game = fs.readFileSync('games/linux/main.js', { encoding: 'utf8' }); //local 확인 시 활성
  const linuxRes = await axios('https://dev.d230bhotgxrf7n.amplifyapp.com/games/linux/main.js'); //local 확인 시 주석
  const game = linuxRes.data; //local 확인 시 주석
  return {
    props: { game }
  };
}