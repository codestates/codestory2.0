import styles from '../styles/modules/gamefooter.module.scss';

export default function Footer() {
  
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <span className={styles.word}>
          © Copyright 2021 Codestory All Rights Reserved
        </span>
      </div>
    </div>
  );
}