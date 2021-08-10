import styles from '../styles/modules/footer.module.scss';

export default function Footer({ isWhite }) {
  
  return (
    <div className={isWhite ? styles.container_white : styles.container}>
      <div className={styles.box}>
        <a href="https://github.com/codestates/codestory2.0">
          <span className={isWhite ? styles.repo_white : styles.repo}>
            Github Repository
          </span>
        </a>
      </div>
      <div className={styles.box}>
        <span className={isWhite ? styles.word_white : styles.word}>
          © Copyright 2021 Codestory All Rights Reserved
        </span>
      </div>
      <div className={styles.box}>
        <span className={styles.name_box}>
          <a className={isWhite ? styles.name_white : styles.name} 
            href="https://github.com/satoshi25">조경일(FE)</a>
          <span className={isWhite ? styles.division_white : styles.division}>|</span>
          <a className={isWhite ? styles.name_white : styles.name} 
            href="https://github.com/seoyong-lee">이서용(FE)</a>
          <span className={isWhite ? styles.division_white : styles.division}>|</span>
          <a className={isWhite ? styles.name_white : styles.name} 
            href="https://github.com/Candyroom136">김정빈(BE)</a>
          <span className={isWhite ? styles.division_white : styles.division}>|</span>
          <a className={isWhite ? styles.name_white : styles.name} 
            href="https://github.com/ruleBased848">강래준(BE)</a> 
        </span>
      </div>
    </div>
  );
}