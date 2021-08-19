import styles from '../styles/modules/gamefooter.module.scss';

export default function Footer({ isWhite }) {
  
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <span className={isWhite ? styles.word_white : styles.word}>
          © Copyright 2021 Codestory All Rights Reserved
        </span>
      </div>
    </div>
  );
}