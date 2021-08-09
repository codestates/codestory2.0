(() => {
  const container = document.querySelector('#game');
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
  div.textContent = 'Alive';
  const divStyle = `
position: absolute;
left: 20px;
top: 20px;
transition: all 4s;
width: 32.52px;
height: 27px;
`;
  div.style = divStyle;

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
  button.addEventListener('click', () => div.style = `${divStyle}${textarea.value}`);

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
  const points = [[10, 10], [520, 10], [520, 660], [10, 660], [10, 440], [265, 440], [265, 230], [10, 230]];
  const interval = 1;
  const dots = getDots(points, interval);
  const ctx = canvas.getContext('2d');
  for (let dot of dots) {
    ctx.beginPath();
    ctx.rect(dot[0] - 0.5, dot[1] - 0.5, 1, 1);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
  }

  // detect collision
  const left = Number(container.style.left.match(/\d+/)[0]);
  const top = Number(container.style.top.match(/\d+/)[0]);
  const collisionHandler = () => {
    for (let dot of dots) {
      if (document.elementFromPoint(left + dot[0], top + dot[1]) === div) {
        div.textContent = 'Dead';
      }
    }
  };
  setInterval(collisionHandler, 10);
})();