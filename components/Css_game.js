import { useEffect } from 'react';
import styles from '../styles/modules/css_game.module.scss';

export default function Css_game({ cssSource }) {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = cssSource;
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.game}>
      <div id="css_game_container"></div>
    </div>
  );
}
