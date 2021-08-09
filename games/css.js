const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    width: 720,
    height: 672.8
  },
  backgroundColor: '#E0E0E0',
  dom: { createContainer: true },
  scene: { create }
};
const game = new Phaser.Game(config);

// assets
const div = document.createElement('div');
div.textContent = '<div>';

const textarea = document.createElement('textarea');
textarea.style = `
all: unset;
width: 180px;
height: 660px;
background-color: white;
font: 16px 'Source Code Pro', monospace;
`;

const button = document.createElement('button');
button.textContent = 'Apply';

// states
let css = '';

function create() {
  const styledDiv = this.add.dom(0, 0, div);
  styledDiv.setOrigin(0);
  styledDiv.setDepth(-1);

  const cssEditor = this.add.dom(625, 336.4, textarea);
  cssEditor.addListener('keyup');
  cssEditor.on('keyup', (e) => css = e.target.value);

  const apply = this.add.dom(625, 650, button);
  apply.addListener('click');
  apply.on('click', () => styledDiv.setElement(div, css));
}