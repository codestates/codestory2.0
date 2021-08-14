(() => {
  const canvas = document.createElement('canvas');
  canvas.style = 'all: unset;';
  const gameContainer = document.querySelector('#game_container');
  const container = document.querySelector('.linux_game_game__3T5m2');
  gameContainer.append(canvas);
  const ctx = canvas.getContext('2d');
  const homeDir = { name: '~', type: 'folder', sudo: true, children: { '.': null, Desktop: null } };
  const desktop = { name: 'Desktop', type: 'folder', sudo: false, children: { '.': null, '..': homeDir } };
  const hello = { name: 'hello.js', type: 'file', sudo: true, content: 'hello coding' };
  homeDir.children['.'] = homeDir;
  homeDir.children.Desktop = desktop;
  desktop.children['.'] = desktop;
  desktop.children['hello.js'] = hello;
  let sudo = 0;
  const linuxPassword = '12345678';
  let wd = desktop;
  let leftfolder = ['Recent', 'Desktop', 'Document', 'Download'];
  const firstFolder = new Image();
  const firstFile = new Image();
  firstFolder.src = 'folder_icon.png';
  firstFile.src = 'file_icon.png';
  let textArr = [`Last login: ${new Date().toUTCString()}`, `${wd.name} $ `];
  const lengthLimit = 43;
  let lineLimit = 10;
  let fontSize = 16;
  window.addEventListener('resize', setSize);
  document.addEventListener('keydown', keyDownHandler);
  function setSize() {
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    if (canvas.width > 360 && canvas.width < 660) {
      fontSize = 13;
      lineLimit = 7;
    } else if (canvas.width < 360) {
      fontSize = 10;
      lineLimit = 6;
    } else {
      fontSize = 16;
      lineLimit = 10;
    }
  }
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
      switch (commandArr[0]) {
      case undefined:
        break;
      case 'sudo':
        if (commandArr[1]) {
          if(sudo === 0) {
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
                  delete wd.children[`${commandArr[i]}`];
                } else {
                  textArr.push(`bash: rm: ${commandArr[i]}: Permission denied`);
                }
              }
            } 
          } 
        } else if (options.length >1 && options[0] !=='r') {
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
        } else {
          for (let folder in wd.children) {
            if (folder[0] !== '.') {
              list = `${list} ${folder}`;
            }
          }
        } 
        textArr.push(list);
        break;
      case 'clear':
        if (commandArr.length === 1) {
          textArr = [`Last login: ${new Date().toUTCString()}`];
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
        break;
      case 'cat':
        if (commandArr[1] && wd.children[commandArr[1]]) {
          const content = wd.children[commandArr[1]].content;
          textArr.push(content);
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
      } break;
    case 16:
    case 20:
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
    ctx.font = `${fontSize}px Arial`;
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
    ctx.font = `${fontSize}px Arial`;
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
    let fPosition = 1;
    let gap = fWidth * 0.35;
    for (let f of toDisplay) {
      ctx.beginPath();
      let lineX = gap + fPosition * fWidth;
      let lineY = 0.08 * canvas.height;
      if (wd.children[f].type === 'folder') {
        ctx.drawImage(firstFolder, lineX, lineY, fWidth, fHeight);
      } else if (wd.children[f].type === 'file') {
        ctx.drawImage(firstFile, lineX, lineY, fWidth, fHeight);
      }
      ctx.fill();
      ctx.closePath();
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = '#000000';
      ctx.fillText(f, gap + fWidth * 0.43 - (f.length) * 3.3 + fPosition * fWidth, 0.3 * canvas.height);
      ++fPosition;
      gap += fWidth * 0.25;
    }
  }
  function drawText() {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    let linePosition = 1;
    for (let i = Math.max(textArr.length - lineLimit, 0); i < textArr.length; ++i) {
      for (let j = 0; j < textArr[i].length; j += lengthLimit) {
        ctx.fillText(textArr[i].slice(j, j + lengthLimit), 0.02 * canvas.width, 0.77 * canvas.height + linePosition * fontSize);
        ++linePosition;
      }
    }
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSize();
    drawBackGround();
    drawBar();
    drawCLI();
    drawGUI();
    drawText();
  }
  setInterval(draw, 10);
})();
