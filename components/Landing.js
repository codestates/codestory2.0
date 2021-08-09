import React from 'react';
import styles from '../styles/modules/landing.module.scss';
import Nav from './Nav';
import Footer from './Footer';

export default function Landing() {

  return (
    <div className={styles.container}>
      <Nav />
      <Footer />
    </div>
  );
}