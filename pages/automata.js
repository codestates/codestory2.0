import Layout from '../components/Layout';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import GameFooter from '../components/GameFooter';
import Tips from '../components/Tips';
import Ranking from '../components/Ranking';
import styles from '../styles/modules/automata.module.scss';
import { useState } from 'react';
import tips from '../games/automata/automataTips';
import Login from '../components/Login';
import Mypage from '../components/Mypage';
import Automata_game from '../components/Automata_game';
import { promises as fs } from 'fs';
import path from 'path';

export default function Automata({ loginHandler, isLogin, automataGame }) {

  const [component, setComponent] = useState(
    [ 'Automata_game', <Automata_game key={0} automataSource={automataGame} /> ]
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

  const homeClickHandler = () => {
    setComponent([ '', null ]);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Nav componentHandler={(e) => componentHandler(e)} 
          isWhite={isWhite}
          loginOpenHandler={loginOpenHandler}
          colorHandler={colorHandler}
          isLogin={isLogin}
          loginHandler={() => loginHandler()}
          homeClickHandler={homeClickHandler}
        />
        {component[0] === 'Ranking' 
          ? <Ranking isLogin={isLogin} />
          : component[0] === 'Mypage'
            ? <Mypage isLogin={isLogin} />
            : component[1]
        }
        {isLoginOpen 
          ? <Login 
            loginOpenHandler={loginOpenHandler} 
            loginHandler={() => loginHandler()}/> 
          : null}
        <div className={styles.tips}>
          {component[0] === 'Automata_game' 
            ? <Tips gametips={tips}
              isWhite={isWhite}/>
            : null
          }
        </div>
      </div>
      {component[0] === 'Automata_game' 
        ? <GameFooter isWhite={isWhite}/> 
        : <Footer isWhite={isWhite}/>
      }
    </Layout>
  );
};

export async function getStaticProps() {
  const automataDirectory = path.join(process.cwd(), '/games/automata/main.js');
  const automataGame = await fs.readFile(automataDirectory, 'utf8');

  return {
    props: {
      automataGame: automataGame
    },
  };
}