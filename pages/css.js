import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/css.module.scss';
import { useState } from 'react';
import tips from '../games/css/cssTips';
import Login from '../components/Login';
import Ranking from '../components/Ranking';
import Css_game from '../components/Css_game';
import { promises as fs } from 'fs';
import path from 'path';

export default function CSS({ loginHandler, isLogin, cssGame }) {

  const [component, setComponent] = useState(
    [ 'Css_game', <Css_game key={0} cssSource={cssGame} /> ]
  );
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
          isLogin={isLogin}
          loginHandler={loginHandler}
        />
        {component[0] === 'Ranking' 
          ? <Ranking isLogin={isLogin} />
          : component[1]
        }
        {isLoginOpen ? <Login loginOpenHandler={loginOpenHandler}/> : null}
        <div className={styles.tips}>
          {component[0] === 'Css_game' 
            ? <Tips gametips={tips}
              isWhite={isWhite}/>
            : null
          }
        </div>
      </div>
      {component[0] === 'Css_game' 
        ? <GameFooter isWhite={isWhite}/> 
        : <Footer isWhite={isWhite}/>
      }
    </Layout>
  );
};

export async function getStaticProps() {
  const cssDirectory = path.join(process.cwd(), '/games/css/main.js');
  const cssGame = await fs.readFile(cssDirectory, 'utf8');

  return {
    props: {
      cssGame: cssGame
    },
  };
}