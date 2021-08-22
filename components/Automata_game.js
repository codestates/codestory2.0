import { useEffect } from 'react';
import styles from '../styles/modules/automata_game.module.scss';

export default function Automata_game({automataSource}) {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = automataSource;
    document.body.append(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.game}>
      <div id="automata_game_container"></div>
    </div>
  );
}

