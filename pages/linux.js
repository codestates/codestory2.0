import Layout from '../components/Layout';
import Nav from '../components/Nav';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/linuxgame.module.scss';
import { useEffect } from 'react';
import tips from '../games/linux/linuxTips';

export default function Linux() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/api/linux';
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
          <Tips gametips={tips}/>
        </div>
        <div className={styles.gamefooter}>
          <GameFooter /> 
        </div>
      </div>
    </Layout>
  );
};