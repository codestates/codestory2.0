import { useEffect } from 'react';
import styles from '../styles/modules/linux_game.module.scss';

export default function Linux_game() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/api/linux';
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.game}>
      <div id="game_container" style={{
        width: '670px',
        height: '755px',
        zIndex: 1
      }}>
      </div>
    </div>
  );
}