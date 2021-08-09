import Layout from '../components/Layout';
import Nav from '../components/Nav';
import GameFooter from '../components/GameFooter';
import styles from '../styles/modules/game.module.scss';
import Script from 'next/script';
import Image from 'next/image';
import fs from 'fs';

export default function Game({ game }) {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Nav />
        </div>
        <Script>{game}</Script>
        <GameFooter /> 
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const game = fs.readFileSync('games/linux.js', { encoding: 'utf8' });
  return {
    props: { game }
  };
}