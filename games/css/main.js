(() => {
  // utils
  const getDotsPolygon = (points, interval) => {
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
  const getDotsCircle = (center, radius, interval) => {
    const num = Math.ceil(2 * Math.PI * radius / interval);
    return new Array(num)
      .fill(0)
      .map((e, i) => [center[0] + radius * Math.sin(i * interval / radius), center[1] - radius * Math.cos(i * interval / radius)]);
  };

  // container
  const container = document.querySelector('#game_container');
  const left = Number(container.style.left.match(/\d+/)[0]);
  const top = Number(container.style.top.match(/\d+/)[0]);

  // canvas
  const canvas = document.createElement('canvas');
  canvas.style = `
all: unset;
background-color: #E0E0E0;
`;
  canvas.width = 720;
  canvas.height = 672.8;
  canvas.addEventListener('click', (e) => {
    textarea.value = `left:${e.clientX - left}px;\ntop:${e.clientY - top}px;\n${textarea.value.replace(/(left|top)\s*:\s*\w*\s*;?\s*/g, '')}`;
  });
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.font = '40px Arial';

  // div
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

  // textarea
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

  // button
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

  // boundary
  const boundary = getDotsPolygon([
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
  ], 4);
  const drawBoundary = () => {
    for (let dot of boundary) {
      ctx.beginPath();
      ctx.rect(dot[0] - 0.5, dot[1] - 0.5, 1, 1);
      ctx.fill();
      ctx.closePath();
    }
  };
  const boundaryCollisionHandler = () => {
    for (let dot of boundary) {
      if (!isReturning && document.elementFromPoint(left + dot[0], top + dot[1]) === div) {
        div.textContent = '😭';
        div.style = divStyle;
        isReturning = true;
        exists = true;
        isOn = false;
        setTimeout(() => {
          isReturning = false;
          div.textContent = '😐';
        }, 4000);
      }
    }
  };

  // home
  const drawHome = () => ctx.fillText('🏠', 70, 600);
  const homeHitbox = getDotsPolygon([
    [70, 565],
    [110, 565],
    [110, 605],
    [70, 605]
  ], 4);
  const endingHandler = () => {
    for (let dot of homeHitbox) {
      if (!isReturning && document.elementFromPoint(left + dot[0], top + dot[1]) === div) {
        div.textContent = '😎';
      }
    }
  };

  // wall
  let exists = true;
  const wallHitbox = getDotsPolygon([
    [195, 440],
    [265, 440],
    [265, 660],
    [195, 660]
  ], 4);
  const drawWall = () => {
    if (exists) {
      ctx.beginPath();
      ctx.rect(195, 440, 70, 220);
      ctx.fill();
      ctx.closePath();
    }
  };
  const wallCollisionHandler = () => {
    for (let dot of wallHitbox) {
      if (exists && !isReturning && document.elementFromPoint(left + dot[0], top + dot[1]) === div) {
        div.textContent = '😭';
        div.style = divStyle;
        isReturning = true;
        isOn = false;
        setTimeout(() => {
          isReturning = false;
          div.textContent = '😐';
        }, 4000);
      }
    }
  };

  // switches
  let isOn = false;
  const switchHitboxes = [getDotsCircle([195, 265], 20, 4), getDotsCircle([90, 370], 20, 4)];
  const drawSwitches = () => {
    ctx.fillText(isOn ? '🟢' : '🔴', 175, 280);
    ctx.fillText(isOn ? '🟢' : '🔴', 70, 385);
  };
  const switchOnHandler = () => {
    if (!isOn && !isReturning && switchHitboxes.every((e) => e.some((dot) => document.elementFromPoint(left + dot[0], top + dot[1]) === div))) {
      isOn = true;
      exists = false;
    }
  };

  container.append(canvas, div, textarea, button);

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoundary();
    drawHome();
    drawWall();
    drawSwitches();
    boundaryCollisionHandler();
    wallCollisionHandler();
    switchOnHandler();
    endingHandler();
  }, 10);
})();