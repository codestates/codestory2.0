import { useEffect } from 'react';
import styles from '../styles/modules/css_game.module.scss';

export default function Css_game() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/api/css';
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
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
  );
}