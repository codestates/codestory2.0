import styles from './footer.module.css';

export default function Footer() {
  
  return (
    <div className={styles.container}>
      <span className={styles.repo}>
        <a href="https://github.com/codestates/codestory2.0">
          Github Repository
        </a>
      </span>
      <span className={styles.word}>
        © Copyright 2021 Codestory All Rights Reserved
      </span>
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
  );
}