const fs = require('fs');

export default async function linux(req, res) {
  const data = fs.readFileSync('games/linux/main.js');
  res.status(200).json(data);
}