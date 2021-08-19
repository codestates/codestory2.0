import { useEffect } from 'react';
import Link from 'next/link';
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
      <div id="linux_result_background">
        <div className={styles.result_container}>
          <h1 className={styles.word}>축하합니다.</h1>
          <h3 className={styles.subword} id="score_word">80 코인을 획득하셨습니다.</h3>
          <Link href="/" passHref>
            <div className={styles.btn_white}>확인</div>
          </Link>
        </div>
      </div>
    </div>
  );
}