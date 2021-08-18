(() => {
  const canvas = document.createElement('canvas');
  canvas.style = 'all: unset;';
  const gameContainer = document.querySelector('#game_container');
  gameContainer.append(canvas);
  canvas.width = parseInt(Number(gameContainer.style.width.match(/\d+/)[0]));
  canvas.height = parseInt(Number(gameContainer.style.height.match(/\d+/)[0]));
  const ctx = canvas.getContext('2d');
  const checkTitleDiv = document.createElement('div');
  const checkListUl = document.createElement('ul');
  const firstCheckList = document.createElement('li');
  const secondCheckList = document.createElement('li');
  const thirdCheckList = document.createElement('li');
  gameContainer.append(checkTitleDiv);
  gameContainer.append(checkListUl);
  checkListUl.append(firstCheckList);
  checkListUl.append(secondCheckList);
  checkListUl.append(thirdCheckList);
  const homeDir = { name: '~', type: 'folder', sudo: true, children: { '.': null, Desktop: null } };
  const desktop = { name: 'Desktop', type: 'folder', sudo: true, children: { '.': null, '..': homeDir } };
  const open_me = { name: 'open_me.txt', type: 'file', sudo: true, content: '안녕하세요. 절 여셨군요!' };
  const move_me = { name: 'move_me.js', type: 'file', sudo: true, content: '절 이동시켜주세요!' };
  const copy_me = { name: 'copy_me.js', type: 'file', sudo: true, content: '절 복사해주세요!' };
  const passwordFile = { name: '.passwordFile.js', type: 'file', sudo: true, content: '관리자비밀번호: 123456789' };
  const error = { name: 'Error', type: 'folder', sudo: true, children: { '.': null, '..': desktop } };
  const bugKing = { name: 'bugKing.js', type: 'file', sudo: true, content: '음하하, 과연 날 지울수 있을까??' };
  const delete_me_file = { name: 'delete_me.sh', type: 'file', sudo: false, content: '숨겨왔던 나의 메시지. 방가방가' };
  const delete_me_folder = { name: 'Delete_me', type: 'folder', sudo: false, children: { '.': null, '..': desktop } };
  const destination = { name: 'Destination', type: 'folder', sudo: true, children: { '.': null, '..': desktop } };
  homeDir.children['.'] = homeDir;
  homeDir.children.Desktop = desktop;
  desktop.children['.'] = desktop;
  desktop.children['open_me.txt'] = open_me;
  desktop.children['delete_me.sh'] = delete_me_file;
  desktop.children['Delete_me'] = delete_me_folder;
  desktop.children['Destination'] = destination;
  desktop.children['move_me.js'] = move_me;
  desktop.children['copy_me.js'] = copy_me;
  desktop.children['.passwordFile.js'] = passwordFile;
  desktop.children['Error'] = error;
  delete_me_folder.children['.'] = delete_me_folder;
  destination.children['.'] = destination;
  error.children['.'] = error;
  error.children['bugKing.js'] = bugKing;
  let sudo = 0;
  const linuxPassword = '123456789';
  let wd = desktop;
  let leftfolder = ['Recent', 'Desktop', 'Document', 'Download'];
  const easyGoal = ['현재 위치에 아무 폴더나 만드시오', '현재 위치에 아무 파일이나 만드시오', '지금까지 쓴 것을 지우시오', '현재 위치를 확인하시오', '현재 위치의 폴더 및 파일을 커맨드 창에서 확인하시오', 
    '현재 위치에서 보이지 않는 폴더 및 파일을 확인하시오', 'Desktop folder에서 open_me.txt 파일을 여시오', 'Desktop folder에서 delete_me.sh 파일을 삭제하시오', 'Desktop folder에서 Delete_me 폴더를 삭제하시오',
    'Desktop folder에서 move_me.js 파일을 Destination 폴더로 이동시키시오', 'Desktop folder에서 copy_me.js 파일을 Destination 폴더로 이동시키시오'];
  const easyHint = ['(hint: mkdir)', '(hint: touch)', '(hint: clear)', '(hint: pwd)', '(hint: ls)', '(hint: ls -a)', '(hint: cat)', '(hint: rm)', '(hint: rm -r)', '(hint: mv)', '(hint: cp)'];
  const hardGoal = [['Desktop에 숨겨진 파일이 하나 있습니다. 그 것을 찾아 여시오.', '파일안의 관리자 비밀번호를 이용해 Error폴더로 이동해 bugKing.js 파일을 지우시오']];
  const hardHint = [['(hint: ls -a, cat)', '(hint: cd, sudo rm)']];
  const easyGoalRemain = new Array(easyGoal.length).fill(0).map((cur, idx) => idx);
  const hardGoalRemain = new Array(hardGoal.length).fill(0).map((cur, idx) => idx);
  const easyList = [];
  const hardList = [];
  let checkList = [];
  for (let i = 0; i <= 11; i++) {
    if (i < 11) {
      const indexOfGoalIndex = Math.floor(easyGoalRemain.length * Math.random());
      const goalIndex = easyGoalRemain[indexOfGoalIndex];
      easyGoalRemain.splice(indexOfGoalIndex, 1);
      easyList.push(goalIndex);
    } else {
      const indexOfGoalIndex = Math.floor(hardGoalRemain.length * Math.random());
      const goalIndex = hardGoalRemain[indexOfGoalIndex];
      hardGoalRemain.splice(indexOfGoalIndex, 1);
      hardList.push(goalIndex);
    }
  }
  const firstFolder = new Image();
  const firstFile = new Image();
  firstFolder.src = 'folder_icon.png';
  firstFile.src = 'file_icon.png';
  let textArr = [`Last login: ${new Date().toUTCString()}`, `${wd.name} $ `];
  const fontSize = 16;
  let lengthLimit = parseInt(canvas.width * 0.1);
  let lineLimit = parseInt(canvas.height * 0.012);

  document.addEventListener('keydown', keyDownHandler);
  function keyDownHandler(e) {
    switch (e.keyCode) {
    case 8:
      if (sudo !==1 && textArr[textArr.length - 1].length > wd.name.length + 3) {
        textArr[textArr.length - 1] = textArr[textArr.length - 1].slice(0, -1);
      } else if (sudo ===1 && textArr[textArr.length - 1].length > 25) {
        textArr[textArr.length - 1] = textArr[textArr.length - 1].slice(0, -1);
      } break;
    case 13:
      let commandArr = [];
      if (sudo === 2 && textArr[textArr.length - 1].slice(wd.name.length + 3).match(/\S+/g)[0] === 'sudo') {
        commandArr = textArr[textArr.length - 1].slice(wd.name.length + 3).match(/\S+/g) || [];
        commandArr.shift();
      } else if (sudo === 1 && textArr[textArr.length - 1].match(/\S+/g)[0] === '[sudo]') {
        const passwordArr = textArr[textArr.length - 1].match(/\S+/g) || [];
        if (passwordArr[4] === linuxPassword) {
          commandArr = textArr[textArr.length - 2].slice(wd.name.length + 3).match(/\S+/g) || [];
          commandArr.shift();
          sudo = 2;
        } else {
          commandArr = [];
          sudo = 0;
        }
      } else {
        commandArr = textArr[textArr.length - 1].slice(wd.name.length + 3).match(/\S+/g) || [];
      }
      const prevFolderLength = Object.keys(wd.children).filter(cur => wd.children[cur].type === 'folder').length;
      const prevFileLength = Object.keys(wd.children).filter(cur => wd.children[cur].type === 'file').length;
      let clearExcution = false;
      let pwdExcution = false;
      let lsExcution = false;
      let lsAExcution = false;
      let isOpenMe = false;
      let isDeleteMe = false;
      let isDeleteMeFolder = false;
      switch (commandArr[0]) {
      case undefined:
        break;
      case 'sudo':
        if (commandArr[1]) {
          if (sudo === 0) {
            const sudoMessage = '[sudo] password for you: '
            textArr.push(sudoMessage);
            let isFirstEnter = 0;
            if (isFirstEnter !== 0) {
              textArr[textArr.length - 1] += e.key === 'Unidentified' ? '' : e.key;
            } else {
              isFirstEnter = 1;
            }
            sudo = 1;
          } else if (sudo === 2) {
            commandArr.shift();
          }
        } else {
          textArr.push(`please input command after sudo`);
        } break;
      case 'cd':
        if (!commandArr[1] || commandArr[1] === '~') {
          wd = homeDir;
        } else {
          const path = commandArr[1].replace(/\/$/g, '');
          const pathArr = path.split('/');
          let newWd = wd;
          let isDirectoryChanged = true;
          for (let folder of pathArr) {
            if (!newWd.children[folder] || !newWd.children[folder].children) {
              textArr.push(`cd: no such file or directory: ${commandArr[1]}`);
              isDirectoryChanged = false;
              break;
            } else {
              newWd = newWd.children[folder];
            }
          }
          if (isDirectoryChanged) {
            wd = newWd;
          }
        } break;
      case 'mkdir':
        for (let i = 1; i < commandArr.length; ++i) {
          if (Object.keys(wd.children).includes(commandArr[i])) {
            textArr.push(`mkdir: ${commandArr[i]}: File exists`);
          } else {
            const newDir = { name: commandArr[i], type: 'folder', sudo: false, children: { '.': null, '..': wd } };
            newDir.children['.'] = newDir;
            wd.children[commandArr[i]] = newDir;
          }
        } break;
      case 'touch':
        for (let i = 1; i < commandArr.length; ++i) {
          if (!(Object.keys(wd.children).includes(commandArr[i]))) {
            const newFile = { name: commandArr[i], type: 'file', sudo: false, content: '' };
            wd.children[commandArr[i]] = newFile;
          }
        }
        break;
      case 'rm':
        const options = [];
        for (let i = 1; i < commandArr.length; ++i) {
          if (commandArr[i][0] === '-' && commandArr[i].length > 1) {
            for (let j = 1; j < commandArr[i].length; j++) {
              if (!options.includes(commandArr[i][j])) {
                options.push(commandArr[i][j])
              }
            }
          }
        }
        if (options.includes('-')) {
          textArr.push('rm: illegal option -- -');
          break;
        }
        if (options.length === 1 && options[0] === 'r') {
          for (let i = 1; i < commandArr.length; ++i) {
            if ((commandArr[i][0] !== '-' || commandArr[i].length === 1)) {
              if (!Object.keys(wd.children).includes(commandArr[i])) {
                textArr.push(`rm: ${commandArr[i]}: No such file or directry`);
              } else if (commandArr[i] === '.' || commandArr[i] === '..') {
                textArr.push(`rm: refusing to remove '.' or '..' directory: skipping '.'`);
              } else {
                if (wd.children[commandArr[i]].sudo === false || sudo === 2) {
                  if (commandArr[i] === 'delete_me.sh') {
                    isDeleteMe = true;
                  }
                  if (commandArr[i] === 'Delete_me') {
                    isDeleteMeFolder = true;
                  }
                  delete wd.children[`${commandArr[i]}`];
                } else {
                  textArr.push(`bash: rm: ${commandArr[i]}: Permission denied`);
                }
              }
            } 
          } 
        } else if (options.length > 1 && options[0] !== 'r') {
          let wrongOption = '';
          for (let i = 0; i < options.length; i++) {
            if (options[i] !== 'r') {
              wrongOption = options[i];
              break;
            }
          }
          textArr.push(`rm: invalid option -- '${options[i]}'`);
        } else if (options.length === 0) {
          for (let i = 1; i < commandArr.length; ++i) {
            if (!Object.keys(wd.children).includes(commandArr[i])) {
              textArr.push(`rm: ${commandArr[i]}: No such file or directry`);
            } else if (wd.children[commandArr[i]].children && !options.includes('r')) {
              textArr.push(`rm: ${commandArr[i]}: is a directory`);
            } else if (commandArr[i] === '.' || commandArr[i] === '..') {
              textArr.push(`rm: refusing to remove '.' or '..' directory: skipping '.'`);
            } else {
              if (wd.children[commandArr[i]].sudo === false || sudo === 2) {
                if (commandArr[i] === 'delete_me.sh') {
                  isDeleteMe = true;
                }
                delete wd.children[`${commandArr[i]}`];
              } else {
                textArr.push(`bash: rm: ${commandArr[i]}: Permission denied`);
              }
            }
          }
        } break;
      case 'ls':
        let list = '';
        if (commandArr[1] === '-a') {
          for (let folder in wd.children) {
            list = `${list} ${folder}`;
          }
          lsAExcution = true;
        } else {
          for (let folder in wd.children) {
            if (folder[0] !== '.') {
              list = `${list} ${folder}`;
            }
          }
          lsExcution = true;
        } 
        textArr.push(list);
        break;
      case 'clear':
        if (commandArr.length === 1) {
          textArr = [`Last login: ${new Date().toUTCString()}`];
          clearExcution = true;
          break;
        }
      case 'pwd':
        let currentLocation = wd.name;
        let currentDirectory = wd;
        while (currentDirectory.children['..']) {
          currentDirectory = currentDirectory.children['..'];
          currentLocation = `${currentDirectory.name}/${currentLocation}`;
        }
        textArr.push(currentLocation);
        pwdExcution = true;
        break;
      case 'cat':
        if (commandArr[1] && wd.children[commandArr[1]]) {
          const content = wd.children[commandArr[1]].content;
          textArr.push(content);
          if (commandArr[1] === 'open_me.txt') {
            isOpenMe = true;
          }
        } else if (commandArr[1]) {
          textArr.push(`cat: ${commandArr[1]}: No such file or directory`);
        } break;
      case 'mv':
        if (commandArr[1]) {
          if (commandArr[2]) {
            if (wd.children[commandArr[1]]) {
              if (wd.children[commandArr[2]]) {
                if (wd.children[commandArr[2]].type === 'file') {
                  if (wd.children[commandArr[1]].type === 'file') {
                    wd.children[commandArr[2]].content = wd.children[commandArr[1]].content;
                    delete wd.children[commandArr[1]];
                  } else if (wd.children[commandArr[1]].type === 'folder') {
                    textArr.push(`mv: cannot overwrite non-directory '${commandArr[2]}' with directory '${commandArr[1]}'`);
                  }
                } else if (wd.children[commandArr[2]].type === 'folder') {
                  if (wd.children[commandArr[2]].children[commandArr[1]]) {
                    if (wd.children[commandArr[2]].children[commandArr[1]].type === 'file') {
                      wd.children[commandArr[2]].children[commandArr[1]] = Object.assign({}, wd.children[commandArr[1]]);
                      delete wd.children[commandArr[1]];
                    } else {
                      textArr.push(`mv: cannot overwrite directory '${commandArr[2]}/${commandArr[1]}' with non-directory`);
                    }
                  } else {
                    wd.children[commandArr[2]].children[commandArr[1]] = Object.assign({}, wd.children[commandArr[1]]);
                    delete wd.children[commandArr[1]];
                  }
                }
              } else {
                wd.children[commandArr[2]] = Object.assign({}, wd.children[commandArr[1]]);
                wd.children[commandArr[2]].name = commandArr[2];
                delete wd.children[commandArr[1]]; 
              }
            } else {
              textArr.push(`mv: cannot stat '${commandArr[1]}': No such file or directory`);
            }
          } else {
            textArr.push(`mv: missing destination file operand after '${commandArr[1]}'`);
          }
        } else {
          textArr.push(`mv: missing file operand`);
        } break;
      case 'cp':
        if (commandArr[1]) {
          if (commandArr[2]) {
            if (wd.children[commandArr[1]]) {
              if (wd.children[commandArr[1]].type === 'file') {
                if (wd.children[commandArr[2]] && wd.children[commandArr[2]].type === 'folder') {
                  wd.children[commandArr[2]].children[commandArr[1]] = Object.assign({}, wd.children[commandArr[1]]);
                } else {
                  if (commandArr[1] !== commandArr[2]) {
                    wd.children[commandArr[2]] = Object.assign({}, wd.children[commandArr[1]]);
                    wd.children[commandArr[2]].name = commandArr[2];
                  } else {
                    textArr.push(`cp: '${commandArr[1]}' and '${commandArr[2]}' are the same file`);
                  }
                }
              } else {
               textArr.push(`cp: -r not specified; omitting directory '${commandArr[1]}'`);
              }
            } else {
              textArr.push(`cp: cannot stat '${commandArr[1]}': No such file or directory`);
            }
          } else {
            textArr.push(`cp: missing destination file operand after '${commandArr[1]}'`);
          }
        } else {
          textArr.push(`cp: missing file operand`);
        } break;
      default:
        textArr.push(`bash: command not found: ${commandArr[0]}`);
      }
      if (sudo !== 1) {
        textArr.push(`${wd.name} $ `);
      }
      function removeItemFromList(index) {
        if (easyList.length !== 0) {
          easyList.splice(easyList.indexOf(index), 1);
        } else if (hardList.length !== 0) {
          hardList.splice(hardList.indexOf(index), 1);
        }
      }
      function isRightAnswer(answer,index) {
        return () => {
          if (answer) {
            removeItemFromList(index);
          }
        }
      }
      const easyAnswerCheckList = [
        () => {
          const currentFolderLength = Object.keys(wd.children).filter(cur => wd.children[cur].type === 'folder').length;
          if (prevFolderLength < currentFolderLength) {
            removeItemFromList(0);
          }
        },
        () => {
          const currentFileLength = Object.keys(wd.children).filter(cur => wd.children[cur].type === 'file').length;
          if (prevFileLength < currentFileLength) {
            removeItemFromList(1);
          }
        },
        isRightAnswer(clearExcution, 2), 
        isRightAnswer(pwdExcution, 3), 
        isRightAnswer(lsExcution, 4), 
        isRightAnswer(lsAExcution, 5),
        isRightAnswer(isOpenMe, 6),
        isRightAnswer(isDeleteMe, 7),
        isRightAnswer(isDeleteMeFolder, 8),
        () => {
          if (!(desktop.children['move_me.js']) && destination.children['move_me.js']) {
            removeItemFromList(9);
          }
        },
        () => {
          if (desktop.children['copy_me.js'] && destination.children['copy_me.js']) {
            removeItemFromList(10);
          }
        }
      ];

      const hardAnswerCheckList = [
        () => {
          if (!error.children['bugKing.js']) {
            removeItemFromList(0);
          }
        }
      ];
      
      if (easyList.length !== 0) {
        for (let i = 0; i < 3; i++) {
          if (easyList[i] || easyList[i] === 0) {
            easyAnswerCheckList[easyList[i]]();
          }
        }
      } else if (hardList.length !== 0) {
        hardAnswerCheckList[hardList[0]]();
      }
      break;
    case 9:
    case 16:
    case 17:
    case 18:
    case 27:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 45:
    case 46:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
    case 123:
    case 144:
      break;
    default:
      textArr[textArr.length - 1] += e.key === 'Unidentified' ? '' : e.key;
    }
  }
  function drawBackGround() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.font = `${canvas.width * 0.035}px Courier New`;
    ctx.fillStyle = 'black';
    ctx.fillText(leftfolder[0], 0.05 * canvas.width, 0.12 * canvas.height);
    ctx.fillText(leftfolder[1], 0.05 * canvas.width, 0.2 * canvas.height);
    ctx.fillText(leftfolder[2], 0.05 * canvas.width, 0.28 * canvas.height);
    ctx.fillText(leftfolder[3], 0.05 * canvas.width, 0.36 * canvas.height);
    ctx.closePath();
  }
  function drawBar() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 0.05 * canvas.height);
    ctx.fillStyle = 'rgb(63,63,63)';
    ctx.fill();
    ctx.font = `${fontSize}px Courier New`;
    ctx.fillStyle = 'white';
    ctx.fillText(wd.name, 0.05 * canvas.width, 0.035 * canvas.height);
    ctx.closePath();
  }
  function drawCLI() {
    ctx.beginPath();
    ctx.rect(0, 0.75 * canvas.height, canvas.width, 0.25 * canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.closePath();
  }
  function drawGUI() {
    ctx.beginPath();
    ctx.rect(0.25 * canvas.width, 0.05 * canvas.height, 0.75 * canvas.width, 0.7 * canvas.height);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.closePath();
    const fWidth = 0.2 * canvas.width;
    const fHeight = 0.2 * canvas.width;
    const toDisplay = Object.keys(wd.children).filter((f) => f[0] !== '.');
    let fPositionX = 0;
    let fPositionY = 0;
    let gapX = fWidth * 1.2;
    let gapY = fWidth * 1.2;
    for (let i = 0; i < toDisplay.length; i++) {
      fPositionX = (i % 3);
      fPositionY = parseInt(i / 3);
      const f = toDisplay[i];
      ctx.beginPath();
      let lineX = 0.28 * canvas.width + gapX * fPositionX;
      let lineY = 0.06 * canvas.height + gapY* fPositionY;
      if (wd.children[f].type === 'folder') {
        ctx.drawImage(firstFolder, lineX, lineY, fWidth, fHeight);
      } else if (wd.children[f].type === 'file') {
        ctx.drawImage(firstFile, lineX, lineY, fWidth, fHeight);
      }
      ctx.fill();
      ctx.closePath();
      ctx.font = `${fontSize}px Courier New`;
      ctx.fillStyle = '#000000';
      const lengthLimit = parseInt(canvas.width * 0.023);
      if (f.length > lengthLimit) {
        ctx.fillText(`${f.slice(0, lengthLimit-2)}..`, lineX + 0.15 * fWidth, lineY + fHeight);
      } else {
        ctx.fillText(f, lineX + 0.15 * fWidth, lineY + fHeight);
      }
    }
  }
  function drawText() {
    ctx.font = `${fontSize}px Courier New`;
    ctx.fillStyle = 'white';
    let linePosition = 1;
    for (let i = Math.max(textArr.length - lineLimit, 0); i < textArr.length; ++i) {
      for (let j = 0; j < textArr[i].length; j += lengthLimit) {
        ctx.fillText(textArr[i].slice(j, j + lengthLimit), 0.02 * canvas.width, 0.77 * canvas.height + linePosition * fontSize);
        ++linePosition;
      }
    }
  }
  function drawCheckList() {
    checkTitleDiv.style.border = '1px black solid';
    checkTitleDiv.style.position = 'relative';
    checkTitleDiv.style.left = `-${0.55 * canvas.width}px`;
    checkTitleDiv.style.top = `-${0.90 * canvas.height}px`;
    checkTitleDiv.style.width = `${0.5 * canvas.width}px`;
    checkTitleDiv.style.height = `${0.05 * canvas.height}px`;
    checkTitleDiv.style.textAlign = 'center'
    checkListUl.style.border = '1px black solid';
    checkListUl.style.position = 'relative';
    checkListUl.style.left = `-${0.55 * canvas.width}px`;
    checkListUl.style.top = `-${0.90 * canvas.height}px`;
    checkListUl.style.width = `${0.5 * canvas.width}px`;
    checkListUl.style.listStyle = 'none';
    firstCheckList.style.border = '1px black solid';
    secondCheckList.style.border = '1px black solid';
    thirdCheckList.style.border = '1px black solid';
    checkTitleDiv.textContent = 'CheckList';
    if (easyList.length !== 0) {
      checkList = [...easyList];
      firstCheckList.textContent = `${easyGoal[checkList[0]]} ${easyHint[checkList[0]]}`;
      if (easyList[1] || easyList[1] === 0) {
        secondCheckList.textContent = `${easyGoal[checkList[1]]} ${easyHint[checkList[1]]}`;
      } else {
        secondCheckList.textContent = '';
      }
      if (easyList[2] || easyList[2] === 0) {
        thirdCheckList.textContent = `${easyGoal[checkList[2]]} ${easyHint[checkList[2]]}`;
      } else {
        thirdCheckList.textContent = '';
      }
    } else {
      if (hardList.length !== 0) {
        checkList = [hardList[0]];
        firstCheckList.textContent = `${hardGoal[checkList[0]][0]} ${hardHint[checkList[0]][0]}`;
        if (hardGoal[checkList[0]][1]) {
          secondCheckList.textContent = `${hardGoal[checkList[0]][1]} ${hardHint[checkList[0]][1]}`;
        } else {
          secondCheckList.textContent = '';
        }
        if (hardGoal[checkList[0][2]]) {
          thirdCheckList.textContent = `${hardGoal[checkList[0]][2]} ${hardHint[checkList[0]][2]}`;
        } else {
          thirdCheckList.textContent = '';
        }
      } else {
        firstCheckList.textContent = '';
        secondCheckList.textContent = '';
        thirdCheckList.textContent = '';
      }
    }
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = parseInt(Number(gameContainer.style.width.match(/\d+/)[0]));
    canvas.height = parseInt(Number(gameContainer.style.height.match(/\d+/)[0]));
    lengthLimit = parseInt(canvas.width * 0.1);
    lineLimit = parseInt(canvas.height * 0.012);
    drawCheckList();
    drawBackGround();
    drawBar();
    drawCLI();
    drawGUI();
    drawText();
  }
  setInterval(draw, 10);
})();
