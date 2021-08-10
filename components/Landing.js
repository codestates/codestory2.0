import React from 'react';
import Link from 'next/link';
import styles from '../styles/modules/landing.module.scss';


export default function Landing() {

  return (
    <div className={styles.container}>
      <Link href='/linux' passHref>
        <button className={styles.btn_game}>Start Linux CLI</button>
      </Link>
    </div>
  );
}