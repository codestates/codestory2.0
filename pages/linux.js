import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/linux.module.scss';
import { useState } from 'react';
import tips from '../games/linux/linuxTips';
import Login from '../components/Login';
import Linux_game from '../components/Linux_game';

export default function Linux({ loginHandler, isLogin }) {

  const [component, setComponent] = useState(<Linux_game />);
  const [isWhite, setIsWhite] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const colorHandler = (e) => {
    if (e === 1) {
      setIsWhite(true);
    } else if (e === 0) {
      setIsWhite(false);
    }
  };

  const componentHandler = (e) => {
    setComponent(e);
  };

  const loginOpenHandler = () => {
    setLoginOpen(!isLoginOpen);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Nav componentHandler={(e) => componentHandler(e)} 
          isWhite={isWhite}
          loginOpenHandler={loginOpenHandler}
          colorHandler={colorHandler}
          isLogin={isLogin}
          loginHandler={loginHandler}
        />
        {component}
        {isLoginOpen ? <Login loginOpenHandler={loginOpenHandler}/> : null}
        <div className={styles.tips}>
          {component.type.name === 'Linux_game' 
            ? <Tips gametips={tips}
              isWhite={isWhite}/>
            : null
          }
        </div>
      </div>
      {component.type.name === 'Linux_game' 
        ? <GameFooter isWhite={isWhite}/> 
        : <Footer isWhite={isWhite}/>
      }
    </Layout>
  );
};