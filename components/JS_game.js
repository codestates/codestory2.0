import { useEffect } from 'react';
import styles from '../styles/modules/js_game.module.scss';

export default function JS_game() {

  useEffect(() => {
    const script = document.createElement('script');
    // script.src = '/api/linux';
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.game}>
      <div id="game_container"></div>
    </div>
  );
}