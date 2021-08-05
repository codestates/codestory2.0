import styles from './footer.module.css';

export default function Footer() {
  
  return (
    <div className={styles.container}>
      <span className={styles.word}>
        © Copyright 2021 Codestory All Rights Reserved
      </span>
    </div>
  );
}