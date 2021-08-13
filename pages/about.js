import Layout from '../components/Layout';
import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Login from '../components/Login';
import styles from '../styles/modules/about.module.scss';

export default function About() {

  const [isLoginOpen, setLoginOpen] = useState(false);
  const isWhite = true;

  const loginOpenHandler = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <Layout>
      <Nav isWhite={isWhite}
        loginOpenHandler={loginOpenHandler}/>
      <div className={styles.container}>
        <span className={styles.word}>
          This is About Compoenet.
        </span>
      </div>
      {isLoginOpen ? <Login loginOpenHandler={loginOpenHandler}/> : null}
      <Footer isWhite={isWhite}/>
    </Layout>
  );
}