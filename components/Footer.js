import styles from '../styles/modules/footer.module.scss';

export default function Footer() {
  
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <a href="https://github.com/codestates/codestory2.0">
          <span className={styles.repo}>
            Github Repository
          </span>
        </a>
      </div>
      <div className={styles.box}>
        <span className={styles.word}>
          © Copyright 2021 Codestory All Rights Reserved
        </span>
      </div>
      <div className={styles.box}>
        <span className={styles.name}>
          <a href="https://github.com/satoshi25">조경일(FE)</a>
          <span className={styles.division}>|</span>
          <a href="https://github.com/seoyong-lee">이서용(FE)</a>
          <span className={styles.division}>|</span>
          <a href="https://github.com/Candyroom136">김정빈(BE)</a>
          <span className={styles.division}>|</span>
          <a href="https://github.com/ruleBased848">강래준(BE)</a> 
        </span>
      </div>
    </div>
  );
}