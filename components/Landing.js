import React from 'react';
import styles from '../styles/modules/landing.module.scss';
import Image from 'next/image';
import Nav from './Nav';
import Footer from './Footer';

export default function Landing() {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          className={styles.logo}
          src="/logotype.svg"
          alt="Logo type"
          width={115}
          height={90}
        />
        <Nav />
      </div>
      <Footer />
    </div>
  );
}