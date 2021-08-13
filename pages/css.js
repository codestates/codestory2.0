import Layout from '../components/Layout';
import Nav from '../components/Nav';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/cssgame.module.scss';
import { useEffect, useState } from 'react';
import tips from '../games/css/cssTips';
import Login from '../components/Login';

export default function CSS() {

  const [isLoginOpen, setLoginOpen] = useState(false);
  const isWhite = true;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/api/css';
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const loginOpenHandler = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Nav isWhite={isWhite}
            loginOpenHandler={loginOpenHandler}/>
        </div>
        <div className={styles.game}>
          <div
            id="game_container"
            style={{
              width: '720px',
              height: '672.8px',
              left: '360px',
              top: '82.1px'
            }}
          />
        </div>
        {isLoginOpen ? <Login loginOpenHandler={loginOpenHandler}/> : null}
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