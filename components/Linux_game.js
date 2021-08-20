import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import result from '../public/profile.png';
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

  const handleDisplay = () => {
    let gameResult = document.querySelector('#linux_display');
    gameResult.setAttribute('id', 'linux_result_background');
  };

  return (
    <div className={styles.game}>
      <div id="linux_game_container">
      </div>
      <div id="linux_result_background">
        <div className={styles.result_container}>
          <h1 className={styles.word}>Stage clear!</h1>
          <div className={styles.box_img}>
            <Image src={result} alt=""/>
          </div>
          <h3 className={styles.subword} id="score_word">score 80</h3>
          <div className={styles.btn_container}>
            <Link href="/" passHref>
              <div className={styles.btn_white}>select game</div>
            </Link>
            <Link href="/linux" passHref>
              <div id="linux_again" onClick={handleDisplay} className={styles.btn_white}>play again</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}