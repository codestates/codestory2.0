import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { Link } from 'next/link';
import Image from 'next/image';
import GameCli from '../components/GameCli';
import GameGui from '../components/GameGui';
import axios from 'axios';
import styles from '../components/game.module.css';

const Game = ({ userInfo, userView, rankingHandler }) => {

  const serverUrl = 'https://api.codestory.academy';
  const stageArr = ['0', '1', '2', '3', '4-1', '4-2', '5', '6-1', '6-2', '6-3', '7-1', '7-2', '8'];
  const [stageIndex, setStageIndex] = useState(0);
  const [script, setScript] = useState('Now loading...');
  const [wd, setWd] = useState('Desktop');
  const [isWaiting, setIsWaiting] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const [curcoin, setCoin] = useState(0);

  useEffect(() => {
    (async () => {
      const result = await axios.post(serverUrl+'/game/answer', { stage: '0', command: '' }, { withCredentials: true });
      setStageIndex(stageIndex + 1);
      setScript(result.data.script);
      setIsWaiting(false);
    })();
  }, []);

  const handleWaiting = () => {
    setIsWaiting(!isWaiting);
  };
  
  const handleStageChange = (script, isSuccess) => {
    setStageIndex(stageIndex + (isSuccess ? 1 : -1));
    if (script) {
      setScript(script);
    }
  };

  const handleWdChange = (wd) => {
    setWd(wd);
  };

  const handleFinish = () => {
    setCoin(Math.floor(Math.random() * 100));
    setIsFinish(true);
  };
  
  const handleCoin = async () => {
    let sumcoin = userInfo.coin + curcoin;
    await axios.patch(serverUrl+'/game/coin', {
      newCoin: sumcoin
    }, {
      withCredentials: true
    });
    await axios.get(serverUrl+'/ranking', {
      withCredentials: true
    }).then((rankinglist) => {
      rankingHandler(rankinglist.data.data);
    });
    const user = {
      username : userInfo.username,
      photourl : userInfo.photourl,
      coin : sumcoin,
      ranking : userInfo.ranking,
      intro : userInfo.intro,
      follower : userInfo.follower,
      following : userInfo.following
    }; 
    userView(user);
  };

  return (
    <Layout>
      {isFinish
        ? <div className={styles.finish_background}>
          <div className={styles.finish}>
            <Image className={styles.congrats_img_left} src="congrats_icon_left.png" alt="congrats icon"/>
            <div className={styles.finish_wordbox}>
              <span className={styles.finish_word}>스테이지 클리어!</span>
              <span className={styles.finish_subword}>{`${curcoin} 코인을 획득하였습니다.`}</span>
              <Link href={href} passHref>
                <div className={styles.finish_btn} onClick={handleCoin}>확인</div>
              </Link>
            </div>
            <Image className={styles.congrats_img_right} src="congrats_icon_right.png" alt="congrats icon"/>
          </div>
        </div> 
        : null }
      <div className={styles.container}>
        <div className={styles.leftside}>
          {/* <GameScript 
            script={script}
            stage={stageIndex}
          /> */}
          <GameCli
            stage={stageArr[stageIndex]}
            handleStageChange={handleStageChange}
            isWaiting={isWaiting}
            handleWaiting={handleWaiting}
            wd={wd}
            handleWdChange={handleWdChange}
            handleFinish={handleFinish}
          />
        </div>
        <span className={styles.arrow}>double_arrow</span>
        <div className={styles.rightside}>
          <GameGui
            stage={stageArr[stageIndex]}
            wd={wd}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Game;