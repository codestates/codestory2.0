(() => {
  // data
  const quizTexts = [
    'Q0. a와 b로 구성된 문자열 중에서 a가 적어도 한 개인 문자열을 인식하는 유한 상태 기계를 만드시오.',
    'Q1. a와 b로 구성된 문자열 중에서 a가 한 개인 문자열을 인식하는 유한 상태 기계를 만드시오.',
    'Q2. a와 b로 구성된 문자열 중에서 a가 3개 이하인 문자열을 인식하는 유한 상태 기계를 만드시오.',
    'Q3. a와 b로 구성된 문자열 중에서 a가 적어도 한 개이고 b가 두 개인 문자열을 인식하는 유한 상태 기계를 만드시오.',
    'Q4. a와 b로 구성된 문자열 중에서 a와 b가 각각 짝수 개인 문자열을 인식하는 유한 상태 기계를 만드시오.'
  ];
  const tests = [
    [['b', false], ['a', true], ['ba', true], ['aaa', true], ['bbbb', false]],
    [['a', true], ['ab', true], ['aa', false], ['bab', true], ['bbb', false]],
    [['bbbb', true], ['abbb', true], ['aabb', true], ['aaab', true], ['aaaa', false]],
    [['bab', true], ['aabb', true], ['baaa', false], ['ababa', true], ['ababba', false]],
    [['bb', true], ['ab', false], ['abba', true], ['aaabb', false], ['abaaba', true]]
  ];
  const circleSource = 'data:image/png;base64,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';
  const doubleCircleSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACoCAYAAACFQP45AAAACXBIWXMAAC4jAAAuIwF4pT92AAAQy0lEQVR4nO1d7XHjRhKFVf4vXASiIxAcgekIlo5guRFYF8FJERw3AlMZUBGYiuDICExGcGQEuKKux8bC6Nc9gwEwAPpVTa1WuwOCM29ef8zXd2VZZgZvLBsqLKhcsiw7NPz7gf7NoMT31lCNWFbIVmRZltOf95Ge/05/7itkNvLWYMr5f9Itqdx+fhjwXc4Vou6pzBZzJGeVjJ8SeB8J70TSHeMuTBZzIeeKyLgaWBnb4kokdWXSmDI5bwq5phLLV0wJkyfq1MiZExmfRq6Qvrj5qlsqp3G9Oo+pkPMWVT+T2e5CJd9rKaJTAwncv7vovgoX7WcdRf9VvGVZtplCMDV2ci6JlD9Fet6xEi33ld5xWYIF/fwY6bnvFTUdJcZKzlikPFZSNvuE8owum7CM8B3P1FajI+nYyFmQyWrTYW+VIGIMSe+8kmlo47YcyRcfjbkfCzmdT/k5sP7YCImwaknUdyJp8jnTMZDzmRrTtyPOpLK7KUWwFeRE0KdAP/UrtW2ygzVlci6JXL4N/14hZSwsaiVjFn9wcKb0UgmyYipXQST1tSxXSr0lmSdNkZw5jehfPeu9Ur22KumiZ1diRc9NONL7urn0ttmBBZHUd+LhjeokpaKpkbOgUeyTQG9LypiRcQzEyCDkRNJ/edRJT0Vv5EykPJd+2JdluQh497wsy3VZlruyLC+enzkEdvS+ecB3vbXP1vOdt4GfFb2koJw5jVatap1phPumRFyEGxrxp4DQrINvCu5IbTxsRD/w6Cg81OtC6uqrHLc6p/QF0gsXUjhfy7H2bO/1XJXzNjJ/U/7fd/r/Wr8yNHr1wVn5PouOF6G8k8+ttSS+AedXasveMRQ5N8rGuVJDbpTP7WKu/VSbZ28zw1JUZnxceirWu/qSdEnugSaqHyaa71mqcw8H/eBhthYUILXFntyAZc/tcvu8p0hB2t7j/XP6TG1/9Boo9U3Mg7IhNh2QvQknqr/qmYwasm5a+so+2Ywn5TMPFCdMipxaYl48iPIUqDIumOhbHUNL0ZKoz0rFK5SfcemLoCkRUzsqi0ATfmiRL0ylrAK/+0k5GHPl83shaCrE3CtJ45uoL8mnGotKaktIcr0kBda0s+bZnRM0BWJuFc8KCXhC8oBzIOlJSSqNH9opQcdAzJWnb+kTrc6ZpE+K564Vz7l0JQJdNZZG5TSN42PGtX7VlMvS08Jo5tE1BO0kzdRFR2lGsDQt5pN/KwOmNadefDIZmnyylqBJk1Pjp2iIqc2H9pp3G1nxGeAa31FDUI2bNgg5V4qXl5LrPgtBTC11RbvYQ5Nj1hBU4671Sk4NqaRRpSXmxXzLoP7RWiPJsmkIGqV/YnxxjRmORUxtPtRKcz9pI3qJoBuhfpQIPkYnSl9YiuS0xIzqz8y4aOfRJYJq+n1Qckp+5iUSMQdd9DrBos0do3bXWMxWcUGb9ZwLWuOI1gP+CJb6F7T2UFpP+GXM5/0kDG37oz7UcODn0DWwdy3abiu81D/Bl8oV9a/UMEbMbnCgBcdX4en7ygl5dZxoXxbCtuHUPR0CJVfyW3ZCfckc9LYsy4rKtToJ7pk0k6ddn9varOc0YjjVO9NI45b0b4W9PVca0bM6/3xgaEz8EShoRvXRlhNv8x5i1iVzjPaarBWbzobfkjo/aEz8o+BirYX62n1gf8FTapct5LsQ6pYWlQ9eNCYe9ZHk7nnNHvma9RPY5orMeU6jE22RfaHdg4ZhIW3ZvlI/c9uikXm/Vm65E+Fj1tcCuZA53wh1X42YyWBLQsHhXjhPCZn3ey/zrpTYXJB7FJ1Lifret5xaURVpRRNKsEvRu2pqU2vWn8GJZUjmpcjeIvN0oXHFUIIeuYCvpLAQGrOeC8eRbID/8SxE9qM4/nmmuCgS7MhEI858zv46hJeFhpzoyOszeMGlcOTMm83+JI+D4H/+BBRwV7kduQlijCGZdckso3nvAzgV2CtqMwyO0L68CdTv4OV/QIehScqJjm8+A2KuheOqkzvi2QCB/MN7oIL7NuopKSdyajnVlBzpN4UvY0gPKCjOgApK6vkPTqiQcqLrn5FqSpeiDnLWo6E1NtTvHELVk+UDIiciEUdMKbJ/meidQHPARTDDKAJH9ViXgSMnOtT0CiJ0FNmjeoZxYBvoQ+6B6j5wbh5HTuQAo8PyUb2kbwszqNGbenIBEQqEOMcXLRg4a5KuhtEALe7gzpCX0pJ/C4yalLMAxDwCn1GaRTJMB5IKNm3LuCgWjHyDJnIi08yRDF3Dd7WZoMkBReD3IFWIREpFTpSD5Jgvqab5mtMDEhyODwcQGD3WXb86OZFJfwMkQ4Q21Zwmtj5EqwCZ9m9uYq6TU4rSm4CmON8srzlphKgnqvONyNWjdTTBz00z3Uj7ianzS6p3eRui4KaOfzAPQhkalA36zv1QVc4cEPMd7A3iiHk1Yk4eJ8rgNOEBbCVWmfa7pl96PCykjmFaQBE4F4ug/eve5OQeFhLZG6YF1M8cP1TKWfU5OX/zCs664XwHVMcwPYTEKmiW6cPvrCon93BONdFVzaaa8wKKwDmLLJr2u+pfPB8SUscwTah8SA+OfARSd9W/MOB2Rxo5DQ4HcJACxxO061ZNTo5oXJ2zJd5nCY4nnLt4ATNMH/nRu+pfGsDlsNCHmmrOE0gJfdXzI1C6q/6lAZwCIpNuhyTME6IP2QDElcWdkPJB57n71jFMG5BoAVz5ICciGqecIYQ2TBvIh+Q4hpZSFpJy+pr1q63dnDU4vnDKiVyBPFQ5OZhqzhtc/6NzDDgspONoOHL6BlCGeQBZTc5Cc9s9PsgZc1ekkXPeEBPrPkDk5BhtCzoMHGLGG6JZb4KlkQwh4ESNC4oe2lwv2ASL1OeN6GbdYIiFqOJk5DQkCyOnIVkYOQ3JwshpSBZGTkOyMHIakoWR0xATURehh5ATzZ+jlzPMG1wOlN2Ldgcq2cojQx9gD+y4izwfbue+zxvIcnqLmmTWOVZzuzKNnAYOvmuDL5Jy+u79MHLOG5xyopvfOByQz5kB5Yy5HN8wHaDDYpuAVip9KCfyBbjKFrEbmsCJEydmcBdvKDmjrtszTAIhwRCqc3EBEbvJiPm9kdNQR8gOCRSjHBw5Ob8z5BAmI+c8ETI7xHHlIxvkyBnzEKZH2wQ3SyCi+YrfB7ccOUMOYQo5MNQwTaBTrkPOd/3wUTXKGUJOdJGBYXpA/R18MnbV5+R8SGTWfU+zNUwTIadciwcW39V/0YCHgHsM0QVJhmkBXZSGrkDnCP3n1LiGnFngZUfoHk3DdBBq0rn7Uv+soyUnx/KQC5IM00LIjdEqQtcvZlVdmFkDupj1ZzsjftK4mfT/Ml8QXcyqulSrvmQu9lVxZtqnjZAr0BfaC4Dr5AzxOxE5P1tCftLg7lTPAk36N1xqUk4uPcQ99Mb0V/CBpp7TxBK4gGeQO1erbdNKeE4J78GD0d2HaHQZxotn8ObcNdfIpP8t7eRDzkxIKXFJ/AdTz8lhAbZXZECsvNwAjpycaf8EIjB0KTwaZYbxAfXnK1jo4RVAcRvckJlGpp0jtanndLCgQJcDR9w1SLy/N80khZCTk+aLqecsgLjRSDICEqfGZ3LkPIDtvygw2gjqacHRuLEUfE1OgFC9qy85s0AV1Kin5T3HC9S37yBP7q2aWcP0ZR0X4Cd8YR6ck7Rz9V7N/xwlblbv3+DFf2Rymzcf9Q9Q7wfOFZBO/OhCPT/bes/RYaGI0LmkO6r3hnb/SsopqSCnnpmwiORM6z3taphxAC3uuVJfNpFMUk24MEhSzouQlEejAgU/Dxa9jwZrQMyMrCSnfqE+6gck5cwU7EfquReiO1tSlzYWZK45y4mWxd1ct9/BtxP7XnN47G1UfAX/vgER+BqkljJSZYve08UOEDMTAltkGUXVzDxONn4GJLsHL3ISXvJecBsMw2EDFmlkJFgodRSSD/0WN7OuLM8lRgGesxfqbjzew0r3ZS3016ksy5x5j9vvL6DuTvv+Gp/TISf/g4vAj2DHpRT1Z4LvaugPtz78j/BpXE4zoz5Ec+9sXrMOnwsLLoIcPwq5Tynx/pttJx4chcIXfBFO8UDEfPE5fttHOR2kCByNqpsf8yuoe6UvaPe294+c+hb5mW9gTa9kHb1z2yHklFJLyLxnCnIbQfuHhphH6heOXChRf8MvvsFv6D1EL+DfH4Xk6wqseMpo5O3NxPcGDTGv5JahRcSImG8hWZkQ5XRAe48zYaQ43wYFSKag3UNDzExImEt9eSVr6z1V3eZ6QSnA2QrHdi+FBL0paLfQEvMLIGZO/Swl6sPWULTMmT0J+bADyIdp8mkl5cxWltuMWgohF+mwFj53J9TftnnvGF9YSrBLSVcNQUtFQ1nRlZWSmNLEyEaojxL1vZFTmhEoFSNIS9BWI9GKaOli9heaMeyNnBm9iARJ+bQEvbkKCyOaV8kVJtjhSXj2KkJf90pOLbmkl14qTY75ofqyJBOrgdQ/Gl81mnWL3RDbnhrAYdfWr5l4kRbrOFwi9cshZnt20TlSgKQh6IK+qLZhTUW/LT5qeVH4h1piRhWKLhomVxJLIqiPn1TSoJi7L5orrZcPoTTE1BA8CXK6RtKMXI3jrI0wHTYzNPU5mXCtO1QqfcPBiNklObVfrFREh+5ZWjPlGux5JiRde5JS6wZpJ0g6IWbX5PQhqGYU+5qsskLSqZl7p5Q+A7b0cH201qrTiZE+GlJL0L1S6VYBnVISsZcjJ+WC3BYfpSzp/2ssVOYhAJ3P2PXVqFqCnpRmIldMn6HPeBqRmuZEBE0WpAk75XfVBrKXvgZ5n41ceHx57agsWnRaSe+TIlEdIX2yFXWcPEjkM/nRmY85JDkzj9FZeibYQ019FSdS49UAgVROn7vxaB8OPoM780zU90bM0nP3ZSy4NYBo5bTDmdYDak8FWdMmO26HqA/cjRCunCItfC6oDZa0CLdQrKnU4Eo7EDbK9ZMF9YPms6UtGp1gCHI6SJvdqvhKpNM2zprOaorR6U14r/xOuqs+r/yMFuWG4kxts/Non2dqH837vLVaMNwGPZuvevHJ0Z0CpimXAemnsWAf0B5av9/heUh+DKmcDj7mJSPVWvvsfyb1WlPpSk37wJkUEp3s1oSc6qA95VVcaSPioIespUDOLKDxsgBT71AQSZcjIaoj5DbQ5/Ux4Vng4O8EqZDTYaXYMFWFbxBQx4I+cyncAd43bgTZkXKFBmEhweFLSuempkbOjAizFQ5eqKMtSR0KKkvFLWWxcKxlBdqa0hBSHqleUtuwUySnw5rI5qNm7toQX58MYVFJ+eS1CHwhkOBa6/B95c9LRDLkZLp9zLdDUmpZRcrkzAJ9UYc3IuqUz/9c0iAOaZ9kfEsOqZPTYUmjO8TMOjUNDShSg/OTnwInG85UN/lBOxZyOrSdAWob+Q6FoqKSoRkG55eP5qKIsZHTIcY05bUSEe8TM29uenMlXLqvQaxgsXeMlZwOXc2luxROH52ZV7IERQQyOoyWlA5jJ6fDWnFIfgiulUUfp1qErY22F5XrUBa10sV8u5trH/0R5lMhp0NBzv4qoYR6X3glQk7mXqepkdMhJ4KulEvzxopjJRMxuasap0rOKqZG1GMlf5tsjjIG5kDOKmJGwX3hSqZ6l2BWoVPMjZx1LIikRUKrlI4NWYNZYu7kbMKyElG7e+G7WAByJD+xOs9ul9RWYOT0Q33bhfZS2T3zs4FDlmX/A2sdbOjE0YxbAAAAAElFTkSuQmCC';

  // states
  let level = 0;
  let startState = null;
  let automaton = [];

  // container
  const container = document.querySelector('#automata_game_container');
  let { left, top, width, height } = container.getBoundingClientRect();

  // stage
  const stage = document.createElement('div');
  Object.assign(stage.style, {
    all: 'unset',
    display: 'block',
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: '#33393C',
    position: 'relative'
  });

  // board
  const board = document.createElement('div');
  Object.assign(board, {
    textContent: quizTexts[0],
    style: 'position: absolute; left: 5%; top: 5%; width: 90%; height: 63%; background-color: #126849; color: white; word-break: keep-all; padding: 5px; overflow: hidden;'
  });

  // score
  const isSolved = new Array(quizTexts.length).fill(false);
  const score = document.createElement('div');
  Object.assign(score, {
    textContent: '현재 점수: 0점',
    style: 'position: absolute; left: 5%; bottom: 5%; color: white; white-space: pre'
  });

  // canvas
  let isDrawing = false;
  let prevX;
  let prevY;
  let from = null;
  let y = 0;
  const canvas = document.createElement('canvas');
  Object.assign(canvas, {
    width: `${width}px`,
    height: `${height}px`,
    style: 'all: unset; position: absolute; left: 0; top: 0;',
    oncontextmenu: (e) => {
      e.preventDefault();
      const img = document.createElement('img');
      Object.assign(img, {
        src: circleSource,
        className: 'single',
        style: `position: absolute; left: ${e.clientX - left - .05 * width - 20}px; top: ${e.clientY - top - .05 * height - 20}px; width: 40px; height: 40px; border-radius: 20px;`,
        onclick: () => {
          if (img.classList.contains('moving')) {
            img.classList.remove('moving');
          } else {
            img.classList.add('moving');
          }
        },
        onmousemove: (e) => {
          if (img.classList.contains('moving')) {
            img.style.left = `${e.clientX - left - .05 * width - 20}px`;
            img.style.top = `${e.clientY - top - .05 * height - 20}px`;
          }
        },
        oncontextmenu: (e) => {
          e.preventDefault();
          startState = img;
        },
        ondblclick: () => {
          if (img.classList.contains('single')) {
            img.classList.remove('single');
            img.classList.add('double');
            img.src = doubleCircleSource;
          } else {
            if (img === startState) {
              startState = null;
            }
            board.removeChild(img);
            automaton = automaton.filter((tr) => {
              if (tr[0] === img || tr[1] === img) {
                board.removeChild(tr[2]);
                return false;
              } else {
                return true;
              }
            });
          }
        }
      });
      board.append(img);
    },
    onmousedown: (e) => {
      if (e.button === 0) {
        isDrawing = true;
        prevX = e.clientX - left - .05 * width;
        prevY = e.clientY - top - .05 * height;
        const imgs = [];
        for (let child of board.children) {
          if (child.tagName === 'IMG') {
            imgs.push(child);
          }
        }
        let nearestImg = null;
        let minDistSqr = Infinity;
        for (let img of imgs) {
          let { left, top } = img.getBoundingClientRect();
          let distSqr = (left + 20 - e.clientX) ** 2 + (top + 20 - e.clientY) ** 2;
          if (distSqr < minDistSqr) {
            minDistSqr = distSqr;
            nearestImg = img;
          }
        }
        from = nearestImg;
      }
    },
    onmouseup: (e) => {
      if (e.button === 0) {
        const imgs = [];
        for (let child of board.children) {
          if (child.tagName === 'IMG') {
            imgs.push(child);
          }
        }
        let nearestImg = null;
        let minDistSqr = Infinity;
        for (let img of imgs) {
          let { left, top } = img.getBoundingClientRect();
          let distSqr = (left + 20 - e.clientX) ** 2 + (top + 20 - e.clientY) ** 2;
          if (distSqr < minDistSqr) {
            minDistSqr = distSqr;
            nearestImg = img;
          }
        }
        if (from && nearestImg && automaton.every((e) => e[0] !== from || e[1] !== nearestImg)) {
          const input = document.createElement('input');
          Object.assign(input, {
            type: 'text',
            style: 'all: unset; position: absolute; left: 0px; top: 0px; width: 20px; color: white',
            onblur: () => {
              if (!input.value) {
                board.removeChild(input);
                automaton = automaton.filter((tr) => tr[2] !== input);
              }
            }
          });
          board.append(input);
          input.focus();
          automaton.push([from, nearestImg, input]);
        }
        isDrawing = false;
      }
    },
    onmousemove: (e) => {
      if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(prevX = e.clientX - left - .05 * width, prevY = e.clientY - top - .05 * height);
        ctx.stroke();
      }
    },
    onwheel: (e) => {
      y += e.deltaY;
      level = Math.floor(y / 100) % quizTexts.length;
      if (level < 0) {
        level += quizTexts.length;
      }
      board.childNodes[0].nodeValue = quizTexts[level];
    }
  });

  // context
  const ctx = canvas.getContext('2d');

  // eraser
  const eraser = document.createElement('div');
  Object.assign(eraser.style, {
    position: 'absolute',
    right: '45px',
    bottom: '0px',
    width: '80px',
    height: '20px',
    borderRadius: '10px 10px 0 0',
    backgroundColor: '#cccccc',
    zIndex: 1
  });

  // device
  const device = document.createElement('div');
  device.style = 'position: absolute; left: 5%; bottom: 5%; width: 90%; height: 25%; background-color: black; font-size: 16px; line-height: 20px; padding: 5px; font-family: \'Source Code Pro\', monospace; white-space: pre;';

  container.append(stage);
  stage.append(board, device);
  board.append(score, canvas, eraser);

  setInterval(() => {
    ({ left, top, width, height } = container.getBoundingClientRect());
    Object.assign(stage.style, {
      width: `${width}px`,
      height: `${height}px`
    });
    const failedTests = [];
    for (let test of tests[level]) {
      if (!startState) {
        if (test[1]) {
          failedTests.push(test);
        }
        continue;
      }
      let states = [startState];
      for (let symbol of test[0]) {
        const newStates = [];
        for (let state of states) {
          for (let tr of automaton) {
            if (tr[0] === state && tr[2].value.includes(symbol)) {
              newStates.push(tr[1]);
            }
          }
        }
        states = newStates;
      }
      if (states.every((state) => state.classList.contains('single'))) {
        if (test[1]) {
          failedTests.push(test);
        }
      } else {
        if (!test[1]) {
          failedTests.push(test);
        }
      }
    }
    if (failedTests.length) {
      device.textContent = failedTests.map((test) => `문자열 ${test[0]}을(를) ${test[1] ? '수용' : '거부'}해야 합니다.`).join('\n');
      device.style.color = 'red';
    } else {
      device.textContent = '정답입니다.';
      device.style.color = 'green';
      isSolved[level] = true;
      score.textContent = `현재 점수: ${20 * isSolved.reduce((a, c) => a + Number(c), 0)}점`;
    }
    if (!isDrawing) {
      Object.assign(canvas, { width, height });
      ctx.strokeStyle = 'white';
      for (let tr of automaton) {
        const fromx = parseFloat(tr[0].style.left);
        const fromy = parseFloat(tr[0].style.top);
        const tox = parseFloat(tr[1].style.left);
        const toy = parseFloat(tr[1].style.top);
        const theta = Math.atan2(toy - fromy, tox - fromx);
        ctx.beginPath();
        if (tr[0] === tr[1]) {
          ctx.arc(tox + 20, toy + 20 - 20 * Math.cos(0.5), 20 * Math.sin(0.5), Math.PI, 0);
        } else {
          ctx.moveTo(fromx + 20 + 20 * Math.cos(theta - 0.5), fromy + 20 + 20 * Math.sin(theta - 0.5));
          ctx.lineTo(tox + 20 - 20 * Math.cos(theta + 0.5), toy + 20 - 20 * Math.sin(theta + 0.5));
          ctx.lineTo(tox + 20 - 40 * Math.cos(theta + 0.5), toy + 20 - 40 * Math.sin(theta + 0.5));
        }
        ctx.stroke();
        if (tr[0] === tr[1]) {
          tr[2].style.left = `${fromx + 20 - 10}px`;
          tr[2].style.top = `${fromy - 30}px`;
        } else {
          tr[2].style.left = `${(fromx + tox) / 2 + 20 + 20 * Math.sin(theta) - 10}px`;
          tr[2].style.top = `${(fromy + toy) / 2 + 20 - 20 * Math.cos(theta) - 13.5}px`;
        }
      }
      if (startState) {
        const x = parseFloat(startState.style.left);
        const y = parseFloat(startState.style.top);
        ctx.beginPath();
        ctx.moveTo(x - 40, y + 20);
        ctx.lineTo(x, y + 20);
        ctx.lineTo(x - 20 * Math.cos(0.5), y + 20 - 20 * Math.sin(0.5));
        ctx.stroke();
      }
    }
  }, 10);
})();