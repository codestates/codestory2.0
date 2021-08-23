import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/modules/mypage.module.scss';
import Image from 'next/image';
import profile from '../public/profile.png';

export default function Mypage({ isLogin }) {

  const serverUrl = 'https://api.codestory.academy';
  const [userInfo, setUserInfo] = useState({
    username: '',
    photourl: '',
    coin: 0,
    intro: '',
    ranking: 0,
    follower: 0,
    following: 0
  });
  const [isEditmode, setIsEditmode] = useState(false);
  const [currentWord, setCurrentWord] = useState('안녕하세요');

  useEffect(() => {
    if (isLogin === true) {
      (async () => {
        try {
          const userInfoData = await axios.get(serverUrl+'/user', { withCredentials: true });
          setUserInfo(userInfoData.data);
        }
        catch {
          console.log('error');
        }
      })();
      setCurrentWord(userInfo.intro);
    } else {
      setUserInfo(
        {
          username: '',
          photourl: '',
          coin: 0,
          intro: '안녕하세요',
          ranking: 1,
          follower: 0,
          following: 0
        }
      );
    }
  }, [isLogin]);

  const openEditMode = () => {
    setIsEditmode(true);
  };

  const updateImg =  async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const res = await axios.patch('api/imageupload', formData, {
      'content-type' : 'application/json', withCredentials : true 
    });
    console.log(res);
  };

  const updateWord = (e) => {
    if (e.target.value.length !== 0) {
      setCurrentWord(e.target.value);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      if (currentWord.length > 0) {
        await axios.patch(serverUrl+'/user', {
          word: currentWord
        }, {
          'content-type': 'application/json',
          withCredentials: true
        });
      }
      setIsEditmode(false);
    }
  };

  const closeEditMode = () => {
    setIsEditmode(false);
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>My Page</span>
      <div className={styles.box}>
        <div className={styles.box_ranking}>
          <div className={styles.ranking_text}>Score</div>
          <div className={styles.ranking_num}>{userInfo.coin}</div>
        </div>
        <div className={styles.box_score}>
          <div className={styles.score_text}>Ranking</div>
          <div className={styles.score_num}>{userInfo.ranking}</div>
        </div>
      </div>
      <div className={styles.box_img}>
        <div className={styles.img}>
          <Image 
            // src={userInfo.photourl !== '../?'
            //   ? userInfo.photourl
            //   : profile}
            src={profile}
            width="160"
            height="160"
            alt="img_profile"
          />
          <div className={styles.box_img_input}> 
            <input className={styles.img_input} 
              type="file" 
              name="file" 
              onChange={(e) => updateImg(e)}
            />
            사진 업로드
          </div>
        </div>
        <span className={styles.id}>{userInfo.username}</span>
      </div>
      {isEditmode 
        ?
        <input className={styles.word_input} 
          placeholder="나의 한마디"
          onChange={(e) => updateWord(e)}
          onKeyPress={(e) => handleKeyPress(e)}
          onBlur={() => closeEditMode()}
        ></input>
        : <span className={styles.word} 
          onClick={() => openEditMode()}
        >{currentWord}</span>
      }
    </div>
  );
}