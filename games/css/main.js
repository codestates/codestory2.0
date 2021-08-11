(() => {
  const container = document.querySelector('#game_container');
  const canvas = document.createElement('canvas');
  container.append(canvas);
  canvas.style = `
all: unset;
background-color: #E0E0E0;
`;
  canvas.width = 720;
  canvas.height = 672.8;

  // assets
  const div = document.createElement('div');
  div.textContent = '😐';
  const divStyle = `
position: absolute;
left: 20px;
top: 20px;
transition: all 4s;
width: 30px;
height: 54px;
background-color: pink;
font-size: 30px;
`;
  div.style = divStyle;
  let isReturning = false;

  const textarea = document.createElement('textarea');
  textarea.style = `
all: unset;
position: absolute;
left: 535px;
top: 6.4px;
width: 180px;
height: 660px;
background-color: white;
font: 16px 'Source Code Pro', monospace;
`;

  const button = document.createElement('button');
  button.textContent = 'Apply';
  button.style = `
all: unset;
position: absolute;
left: 606.235px;
top: 636.5px;
background-color: #E0E0E0;
`;
  button.addEventListener('click', () => {
    if (!isReturning) {
      div.style = `${divStyle}${textarea.value}`
    }
  });

  // use assets
  container.append(div, textarea, button);

  // draw
  const getDots = (points, interval) => {
    const dots = [];
    for (let i = 0; i < points.length; ++i) {
      const [xi, yi] = points[i];
      const [xf, yf] = points[(i + 1) % points.length];
      const length = ((xf - xi) ** 2 + (yf - yi) ** 2) ** .5;
      const [vx, vy] = [interval / length * (xf - xi), interval / length * (yf - yi)];
      const num = Math.ceil(length / interval);
      dots.push(...new Array(num).fill(0).map((e, i) => [xi + i * vx, yi + i * vy]));
    }
    return dots;
  };
  // boundary
  const points = [
    [10, 10],
    [520, 10],
    [520, 660],
    [10, 660],
    [10, 440],
    [265, 440],
    [265, 370],
    [125, 370],
    [90, 405],
    [55, 370],
    [195, 230],
    [230, 265],
    [195, 300],
    [265, 300],
    [265, 230],
    [10, 230]
  ];
  const interval = 4;
  const dots = getDots(points, interval);
  const ctx = canvas.getContext('2d');
  for (let dot of dots) {
    ctx.beginPath();
    ctx.rect(dot[0] - 0.5, dot[1] - 0.5, 1, 1);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }
  // ending
  ctx.font = '40px Arial';
  ctx.fillText('🏠', 70, 600);

  // detect collision
  const left = Number(container.style.left.match(/\d+/)[0]);
  const top = Number(container.style.top.match(/\d+/)[0]);
  const collisionHandler = () => {
    for (let dot of dots) {
      if (!isReturning && document.elementFromPoint(left + dot[0], top + dot[1]) === div) {
        div.textContent = '😭';
        div.style = divStyle;
        isReturning = true;
        setTimeout(() => {
          isReturning = false;
          div.textContent = '😐';
        }, 4000);
      }
    }
  };

  // detect ending
  const hitbox = [[70, 565], [110, 565], [110, 605], [70, 605]];
  const temp = 4;
  const border = getDots(hitbox, temp);
  const endingHandler = () => {
    for (let dot of border) {
      if (!isReturning && document.elementFromPoint(left + dot[0], top + dot[1]) === div) {
        div.textContent = '😎';
      }
    }
  };

  setInterval(() => {
    collisionHandler();
    endingHandler();
  }, 10);
})();