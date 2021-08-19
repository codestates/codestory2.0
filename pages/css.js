import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/css.module.scss';
import { useState } from 'react';
import tips from '../games/css/cssTips';
import Login from '../components/Login';
import Css_game from '../components/Css_game';

export default function CSS({ loginHandler }) {

  const [component, setComponent] = useState(<Css_game />);
  const [isWhite, setIsWhite] = useState(true);
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
        />
        {component}
        {isLoginOpen ? <Login loginOpenHandler={loginOpenHandler}/> : null}
        <div className={styles.tips}>
          {component.type.name === 'Css_game' 
            ? <Tips gametips={tips}
              isWhite={isWhite}/>
            : null
          }
        </div>
      </div>
      {component.type.name === 'Css_game' 
        ? <GameFooter isWhite={isWhite}/> 
        : <Footer isWhite={isWhite}/>
      }
    </Layout>
  );
};