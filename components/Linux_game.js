import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import result from '../public/finish.png';
import styles from '../styles/modules/linux_game.module.scss';
import axios from 'axios';

export default function Linux_game({ linuxSource, isLogin }) {

  const [replay, setReplay] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: '',
    photoUrl: '',
    score: 0,
    intro: '',
    ranking: 0,
    follower: 0,
    following: 0
  });
  const [curScore, setScore] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = linuxSource;
    document.body.append(script);
    if (isLogin) {
      (async () => {
        const userdata = await axios.get('/api/user', { withCredentials: true });
        setUserInfo(userdata.data);
      })();
    }
    return () => {
      document.body.removeChild(script);
    };
  }, [replay]);

  useEffect(() => {
    if (isLogin) {
      setScore(userInfo.score);
    }
  }, [userInfo]);

  const handleDisplay = async (e) => {
    if (isLogin) {
      await axios.patch('/api/user', {
        data: {
          type: 'score',
          score: curScore + 120,
          apiPassword: process.env.NEXT_PUBLIC_API_PASSWORD
        }}, {
        'content-type': 'application/json',
        withCredentials: true
      }
      );
    }
    if (e.target.textContent === 'paly again') {
      let gameResult = document.querySelector('#linux_display');
      gameResult.setAttribute('id', 'linux_result_background');
      setReplay(!replay);
    }
  };

  return (
    <div className={styles.game}>
      <div id="linux_game_container">
      </div>
      <div id="linux_result_background">
        <div className={styles.result_container}>
          <h1 className={styles.word}>Stage clear!</h1>
          <div className={styles.box_img}>
            <Image src={result} alt="finish"/>
          </div>
          <h3 className={styles.subword} id="score_word">{isLogin ? 'Score 120' : 'Congratulations'}</h3>
          <div className={styles.btn_container}>
            <Link href="/" passHref>
              <div className={styles.btn_white} onClick={handleDisplay}>select game</div>
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