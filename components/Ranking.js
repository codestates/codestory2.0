import styles from '../styles/modules/ranking.module.scss';
import Image from 'next/image';
import profile from '../public/profile.png';

export default function Ranking() {

  const serverUrl = 'https://';
  const ranking = 
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
  };
  let rankingList = [...ranking.data];

  return (
    <div className={styles.container}>
      <span className={styles.title}>Ranking</span>
      <div className={styles.box}>
        <div className={styles.box_ranking}>
          <span className={styles.ranking}>2</span>
          <div className={styles.img}>
            <Image 
              // src={rankingList[1].photourl === '../?'
              //   ? profile
              //   : rankingList[1].photourl
              // }
              src={profile}
              width="160"
              height="160"
              alt="img_ranking2"
            />
          </div>
          <span className={styles.id}>{rankingList[1].username}</span>
        </div>
        <div className={styles.box_ranking}>
          <span className={styles.ranking}>1</span>
          <div className={styles.img}>
            <Image 
              src={profile}
              width="160"
              height="160"
              alt="img_ranking1"
            />
          </div>
          <span className={styles.id}>{rankingList[0].username}</span>
        </div>
        <div className={styles.box_ranking}>
          <span className={styles.ranking}>3</span>
          <div className={styles.img}>
            <Image 
              src={profile}
              width="160"
              height="160"
              alt="img_ranking3"
            />
          </div>
          <span className={styles.id}>{rankingList[2].username}</span>
        </div>
      </div>
      <div className={styles.box_list}>
        {rankingList.slice(3).map((rank, index) => {
          return (
            <>
              <div className={styles.list}>{index + 4} {rank.username}</div>
              {index === rankingList.length - 4 
                ? null 
                : <hr className={styles.line}/>
              }
            </>
          );
        })};
      </div>
    </div>
  );
}