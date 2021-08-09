const fs = require('fs');

export default async function css(req, res) {
  const data = fs.readFileSync('games/css.js');
  res.status(200).json(data);
}