import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/modules/ranking.module.scss';
import Image from 'next/image';
import profile from '../public/profile.png';

export default function Ranking({ isLogin }) {

  const [ranking, setRanking] = useState({ data: [] });
  const [isDemo, setIsDemo] = useState(false);
  const [followWord, setFollowWord] = useState([]);

  useEffect(() => {
    if (isLogin === true) {
      (async () => {
        try {
          const rankingData = await axios.get('/api/ranking', { withCredentials: true });
          setRanking(rankingData.data);
        }
        catch {
          console.log('error');
        }
      })();
      setIsDemo(false);
    } else {
      setIsDemo(true);
      setRanking(
        {
          data: [
            {
              username: 'rulebased848',
              photourl: '',
              coin: 1000
            },
            {
              username: 'candyroom123',
              photourl: '',
              coin: 900
            },
            {
              username: 'kimcoding',
              photourl: '',
              coin: 800
            },
            {
              username: 'leecoder',
              photourl: '',
              coin: 700
            },
            {
              username: 'codestory123',
              photourl: '',
              coin: 600
            },
            {
              username: 'codemaster111',
              photourl: '',
              coin: 500
            },
            {
              username: 'someone123',
              photourl: '',
              coin: 400
            }
          ]
        }
      );
    }
  }, [isLogin]);
  
  let rankingList = [...ranking.data];

  const rankingHandler = (rankinglist) => {
    setRanking({ ...ranking, data: [...rankinglist] });
  };

  const followHandler = async (e) => {
    if (e.following === 'me') {
      return;
    } else if (e.following === false) {
      await axios.post('/api/follower', {
        username: e.username
      }, {
        'content-type': 'application/json',
        withCredentials: true
      }).then((result) => {
        rankingList = rankingList.map((rank) => {
          if (rank.username === e.username) {
            rank.following = result.data.result;
            return rank;
          }
          return rank;
        });
        rankingHandler(rankingList);
      });
    } else if (e.following === true) {
      await axios.delete('/api/follower', {
        data: {
          username: e.username
        },
        'content-type': 'application/json',
        withCredentials: true
      }).then(() => {
        rankingList = rankingList.map((rank) => {
          if (rank.username === e.username) {
            rank.following = false;
            return rank;
          }
          return rank;
        });
        rankingHandler(rankingList);
      });
    }
  };

  const mouseOverHandler = (rank) => {
    setFollowWord([...followWord, rank]);
  };

  const mouseLeaveHandler = (rank) => {
    let newList = followWord.filter((el) => el !== rank);
    setFollowWord(newList);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Ranking</span>
      <div className={styles.box}>
        {rankingList.slice(0, 3).map((rank, index) => {
          return (
            <React.Fragment key={rank.username}>
              <div className={styles.box_ranking}>
                <span className={rank.following === 'me'
                  ? styles.ranking_me
                  : styles.ranking
                }>{index + 1}</span>
                <div className={styles.img}>
                  <Image 
                    // src={rankingList[1].photourl === '../?'
                    //   ? profile
                    //   : rankingList[1].photourl
                    // }
                    src={profile}
                    width="160"
                    height="160"
                    alt="img_ranking"
                  />
                  {isDemo 
                    ? null
                    : rank.following === 'me'
                      ? null
                      : rank.following === true
                        ? <div className={styles.img_cover_following}
                          onClick={() => followHandler(rank)}>
                          언팔로우
                        </div> 
                        : <div className={styles.img_cover}
                          onClick={() => followHandler(rank)}>
                          팔로우
                        </div>
                  }
                </div>
                <span className={rank.following === 'me'
                  ? styles.id_me
                  : styles.id
                }>
                  {rank.username}
                </span>
              </div>
            </React.Fragment>
          );
        })
        }
      </div>
      <div className={styles.box_list}>
        {rankingList.slice(3).map((rank, index) => {
          return (
            <React.Fragment key={rank.username}>
              <div className={styles.list}>
                <div className={rank.following === 'me' 
                  ? styles.list_word_me
                  : styles.list_word
                }>
                  {index + 4} {rank.username}
                </div>
                {isDemo 
                  ? null
                  : rank.following === 'me'
                    ? null
                    : rank.following === true
                      ? <div className={styles.list_btn_following}
                        onClick={() => followHandler(rank)}
                        onMouseOver={() => mouseOverHandler(rank)}
                        onMouseLeave={() => mouseLeaveHandler(rank)} 
                      >
                        {followWord.includes(rank)
                          ? '언팔로우'
                          : '팔로잉'
                        }
                      </div> 
                      : <div className={styles.list_btn}
                        onClick={() => followHandler(rank)}>
                        팔로우
                      </div> 
                }
              </div>
              {index === rankingList.length - 4 
                ? null 
                : <hr className={styles.line}/>
              }
            </React.Fragment>
          );
        })};
      </div>
    </div>
  );
}