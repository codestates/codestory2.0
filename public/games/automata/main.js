(() => {
  // states
  let name = 0;

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
    state.style = 'position: absolute; left: 0px; top: 0px; width: 40px; height: 40px; text-align: center;';
    state.addEventListener('dragover', (e) => {
      state.style.left = `${e.clientX - left - 20}px`;
      state.style.top = `${e.clientY - top - 20}px`;
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
    state.style = 'position: absolute; left: 0px; top: 0px; width: 40px; height: 40px; text-align: center;';
    state.addEventListener('dragover', (e) => {
      state.style.left = `${e.clientX - left - 20}px`;
      state.style.top = `${e.clientY - top - 20}px`;
    });
    const doubleCircle = document.createElement('img');
    doubleCircle.src = 'double-circle.png';
    doubleCircle.style = 'position: absolute; left: 0px; top: 0px; width: 40px; height: 40px;';
    stage.append(state);
    state.append(doubleCircle);
  });

  container.append(stage);
  stage.append(canvas, list, addButton, circleButton, doubleCircleButton);

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
  }, 10);
})();