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
      <div id="linux_game_container">
      </div>
    </div>
  );
}
