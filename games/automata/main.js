(() => {
  // states
  let name = 0;
  let startStateName = null;
  let automaton = null;

  // container
  const container = document.querySelector('#automata_game_container');
  let { left, top, width, height } = container.getBoundingClientRect();

  // stage
  const stage = document.createElement('div');
  stage.style = `all: unset; display: block; width: ${width}px; height: ${height}px; position: relative;`;

  // canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style = 'all: unset; background-color: cyan;';
  const ctx = canvas.getContext('2d');

  // quiz
  const quiz = document.createElement('div');
  quiz.textContent = 'Q1. 0과 1의 개수가 각각 짝수인 문자열을 인식하는 유한 상태 기계를 만드시오.';
  quiz.style = `
position: absolute;
left: 10px;
top: 10px;
width: 460px;
height: 30px;
`;

  // test case
  const testCase = document.createElement('div');
  testCase.style = `
position: absolute;
left: 10px;
top: 590px;
width: 200px;
height: 170px;
background-color: white;
overflow: auto;
`;
  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  const thead = document.createElement('thead');
  const tr1 = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = '문자열';
  th1.style.border = '1px solid #333';
  const th2 = document.createElement('th');
  th2.textContent = '예상 결과';
  th2.style.border = '1px solid #333';
  const th3 = document.createElement('th');
  th3.textContent = '실행 결과';
  th3.style.border = '1px solid #333';
  const tbody = document.createElement('tbody');
  const tr2 = document.createElement('tr');
  const td1 = document.createElement('td');
  td1.textContent = '010010';
  td1.style.border = '1px solid #333';
  const td2 = document.createElement('td');
  td2.textContent = 'true';
  td2.style.border = '1px solid #333';
  const td3 = document.createElement('td');
  td3.style.border = '1px solid #333';
  testCase.append(table);
  table.append(thead, tbody);
  thead.append(tr1);
  tr1.append(th1, th2, th3);
  tbody.append(tr2);
  tr2.append(td1, td2, td3);

  // list
  const list = document.createElement('div');
  list.style = `
position: absolute;
left: 490px;
top: 40px;
width: 170px;
height: 460px;
background-color: white;
overflow: auto;
`;

  // add button
  const addButton = document.createElement('button');
  addButton.textContent = '+';
  addButton.style = 'position: absolute; left: 490px; top: 10px; width: 170px;';
  addButton.addEventListener('click', () => {
    const div = document.createElement('div');
    div.style = 'width: 170px; height: 50px;';
    const fromSpan = document.createElement('span');
    fromSpan.textContent = 'from:';
    const fromInput = document.createElement('input');
    fromInput.type = 'text';
    fromInput.style = 'all: unset; width: 10px;';
    const toSpan = document.createElement('span');
    toSpan.textContent = 'to:';
    const toInput = document.createElement('input');
    toInput.type = 'text';
    toInput.style = 'all: unset; width: 10px;';
    const symbolSpan = document.createElement('span');
    symbolSpan.textContent = 'symbol:';
    const symbolInput = document.createElement('input');
    symbolInput.type = 'text';
    symbolInput.style = 'all: unset; width: 10px;';
    list.append(div);
    div.append(fromSpan, fromInput, toSpan, toInput, symbolSpan, symbolInput);
  });

  // circle button
  const circleButton = document.createElement('button');
  circleButton.textContent = 'Create new circle';
  circleButton.style = 'position: absolute; left: 490px; top: 510px; width: 170px;';
  circleButton.addEventListener('click', () => {
    const state = document.createElement('div');
    state.textContent = name;
    state.setAttribute('name', name);
    ++name;
    state.style = 'position: absolute; left: 0px; top: 40px; width: 40px; height: 40px; text-align: center;';
    state.addEventListener('dragover', (e) => {
      state.style.left = `${e.clientX - left - 20}px`;
      state.style.top = `${e.clientY - top - 20}px`;
    });
    state.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      startStateName = state.getAttribute('name');
    });
    const circle = document.createElement('img');
    circle.src = 'circle.png';
    circle.style = 'position: absolute; left: 0px; top: 0px; width: 40px; height: 40px;';
    stage.append(state);
    state.append(circle);
  });

  // double circle button
  const doubleCircleButton = document.createElement('button');
  doubleCircleButton.textContent = 'Create new double circle';
  doubleCircleButton.style = 'position: absolute; left: 490px; top: 540px; width: 170px;';
  doubleCircleButton.addEventListener('click', () => {
    const state = document.createElement('div');
    state.textContent = name;
    state.setAttribute('name', name);
    ++name;
    state.style = 'position: absolute; left: 0px; top: 40px; width: 40px; height: 40px; text-align: center;';
    state.addEventListener('dragover', (e) => {
      state.style.left = `${e.clientX - left - 20}px`;
      state.style.top = `${e.clientY - top - 20}px`;
    });
    state.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      startStateName = state.getAttribute('name');
    });
    const doubleCircle = document.createElement('img');
    doubleCircle.src = 'double-circle.png';
    doubleCircle.style = 'position: absolute; left: 0px; top: 0px; width: 40px; height: 40px;';
    stage.append(state);
    state.append(doubleCircle);
  });

  // run button
  const runButton = document.createElement('button');
  runButton.textContent = 'Run';
  runButton.style = 'position: absolute; left: 490px; top: 590px; width: 170px;';
  runButton.addEventListener('click', () => {
    if (!startStateName) {
      td3.textContent = 'error';
      return;
    }
    const input = td1.textContent;
    let states = [Number(startStateName)];
    for (let symbol of input) {
      let newStates = [];
      for (let state of states) {
        for (let i = 0; i < (automaton[state] || []).length; ++i) {
          if (automaton[state][i] && automaton[state][i].includes(symbol)) {
            newStates.push(i);
          }
        }
      }
      states = newStates;
    }
    td3.textContent = states.some((state) => {
      let div;
      for (let child of stage.children) {
        if (child.getAttribute('name') === String(state)) {
          div = child;
          break;
        }
      }
      return /double-circle\.png$/.test(div.children[0].src);
    });
  });

  container.append(stage);
  stage.append(canvas, quiz, testCase, list, addButton, circleButton, doubleCircleButton, runButton);

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    left = container.getBoundingClientRect().left;
    top = container.getBoundingClientRect().top;
    width = container.getBoundingClientRect().width;
    height = container.getBoundingClientRect().height;
    stage.style.width = `${width}px`;
    stage.style.height = `${height}px`;
    canvas.width = width;
    canvas.height = height;
    if (startStateName) {
      let startState;
      for (let child of stage.children) {
        if (child.getAttribute('name') === startStateName) {
          startState = child;
        }
      }
      ctx.beginPath();
      ctx.moveTo(parseFloat(startState.style.left) - 40, parseFloat(startState.style.top) + 20);
      ctx.lineTo(parseFloat(startState.style.left), parseFloat(startState.style.top) + 20);
      ctx.lineTo(parseFloat(startState.style.left) - 20 * Math.cos(0.5), parseFloat(startState.style.top) + 20 - 20 * Math.sin(0.5));
      ctx.stroke();
    }
    const matrix = [];
    for (let child of list.children) {
      const fromName = child.children[1].value;
      const toName = child.children[3].value;
      const symbol = child.children[5].value;
      let from;
      for (let e of stage.children) {
        if (e.getAttribute('name') === fromName) {
          from = e;
          break;
        }
      }
      let to;
      for (let e of stage.children) {
        if (e.getAttribute('name') === toName) {
          to = e;
          break;
        }
      }
      if (from && to && symbol.length === 1) {
        child.style.backgroundColor = 'green';
        if (!matrix[Number(fromName)]) {
          matrix[Number(fromName)] = [];
        }
        if (!matrix[Number(fromName)][Number(toName)]) {
          matrix[Number(fromName)][Number(toName)] = [];
        }
        const fromx = parseFloat(from.style.left);
        const fromy = parseFloat(from.style.top);
        const tox = parseFloat(to.style.left);
        const toy = parseFloat(to.style.top);
        const theta = Math.atan2(toy - fromy, tox - fromx);
        if (!matrix[Number(fromName)][Number(toName)].length) {
          ctx.beginPath();
          ctx.moveTo(fromx + 20 + 20 * Math.cos(theta + 0.5), fromy + 20 + 20 * Math.sin(theta + 0.5));
          ctx.lineTo(tox + 20 + 20 * Math.cos(theta + Math.PI - 0.5), toy + 20 + 20 * Math.sin(theta + Math.PI - 0.5));
          ctx.lineTo(tox + 20 + 40 * Math.cos(theta + Math.PI - 0.5), toy + 20 + 40 * Math.sin(theta + Math.PI - 0.5));
          ctx.stroke();
        }
        if (!matrix[Number(fromName)][Number(toName)].includes(symbol)) {
          matrix[Number(fromName)][Number(toName)].push(symbol);
          ctx.font = '16px \'Source Code Pro\', monospace';
          ctx.fillText(matrix[Number(fromName)][Number(toName)].join(), fromx + 20 + 20 * Math.cos(theta + 0.5), fromy + 20 + 20 * Math.sin(theta + 0.5));
        }
      } else {
        child.style.backgroundColor = 'red';
      }
    }
    automaton = matrix;
  }, 10);
})();