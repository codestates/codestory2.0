const fs = require('fs');

export default async function css(req, res) {
  const data = fs.readFileSync('public/games/css/main.js');
  res.status(200).json(data);
}