import { useState, useEffect } from 'react';
import styles from './gamecli.module.css';
import axios from 'axios';

export default function GameCli({ stage, handleStageChange, isWaiting, handleWaiting, wd, handleWdChange, handleFinish }) {

  const serverUrl = 'https://api.codestory.academy';
  const [cli, setCli] = useState([`Last login: ${new Date().toUTCString()}`]);
  const [command, setCommand] = useState('');
  const [enterCount, setEnterCount] = useState(0);
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await axios.post(serverUrl+'/game/answer', { stage, command }, { withCredentials: true });
      if (result.data.result) {
        handleStageChange(result.data.script, true);
        const commandArr = command.match(/\S+/g) || [];
        switch (commandArr[0]) {
        case 'cd':
          handleWdChange(commandArr[1].match(/([^/]+)$/)[1]); break;
        case 'ls':
          setCli([...cli, '.password']); break;
        case 'cat':
          setCli([...cli, 'password: 1234', 'path: ~/Desktop/.hidden']); break;
        case 'sudo':
          setIsPassword(true); break;
        }
      }
      else {
        if (isPassword) {
          handleStageChange(null, false);
        }
        setCli([...cli, isPassword ? 'ERROR: Permission denied' : `command not found: ${command}`]);
      }
      setCommand('');
      handleWaiting();
      if (isPassword) {
        setIsPassword(false);
      }
    })();
  }, [enterCount]);

  const inputText = (e) => {
    setCommand((isPassword ? command : '') + e.target.value);
  };

  const onKeyPress = (e) => {
    if(e.charCode === 13) {
      if(stage === '8') {
        handleFinish();
      }
      setCli([...cli, isPassword ? 'Password:' : `${wd} $ ${command}`]);
      handleWaiting();
      setEnterCount(enterCount + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titlebar}>
        <div className={styles.buttons}>
          <div className={styles.close}>&times;</div>
          <div className={styles.minimum}>-</div>
          <div className={styles.maximum}>□</div>
        </div>
      </div>
      <div className={styles.display_wrapper}>
        <div className={styles.display}>
          {cli.map((line, i) => <div key={i}>{line}</div>)}
          {isWaiting
            ? <div>잠시 기다려주세요</div>
            : <div className={styles.input_wrapper}>
              {isPassword ? 'Password:' : `${wd} $`}
              <input
                className={styles.input_commands}
                type="text"
                placeholder={isPassword ? '' : '명령어를 입력하세요'}
                value={isPassword ? '' : command}
                onChange={inputText}
                onKeyPress={onKeyPress}
                autoFocus
              />
            </div>}
        </div>
      </div>
      <div className={styles.scroll}></div>
    </div>
  );
};