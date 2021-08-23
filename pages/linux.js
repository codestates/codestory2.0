import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import styles from '../styles/modules/linux.module.scss';
import { useState } from 'react';
import tips from '../games/linux/linuxTips';
import Login from '../components/Login';
import Ranking from '../components/Ranking';
import Linux_game from '../components/Linux_game';
import { promises as fs } from 'fs';
import path from 'path';

export default function Linux({ loginHandler, isLogin, linuxGame }) {

  const [component, setComponent] = useState(
    [ 'Linux_game', <Linux_game key={0} linuxSource={linuxGame} isLogin={isLogin}/> ]
  );
  const [isWhite, setIsWhite] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const colorHandler = (e) => {
    if (e === 2) {
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
          {component[0] === 'Linux_game' 
            ? <Tips gametips={tips}
              isWhite={isWhite}/>
            : null
          }
        </div>
      </div>
      {component[0] === 'Linux_game' 
        ? <GameFooter isWhite={isWhite}/> 
        : <Footer isWhite={isWhite}/>
      }
    </Layout>
  );
};

export async function getStaticProps() {
  const linuxDirectory = path.join(process.cwd(), '/games/linux/main.js');
  const linuxGame = await fs.readFile(linuxDirectory, 'utf8');

  return {
    props: {
      linuxGame: linuxGame
    },
  };
}