// const fs = require('fs'); // local 확인 시 활성
const axios = require('axios'); // local 확인 시 주석

export default async function css(req, res) {
  // const data = fs.readFileSync('games/css/main.js'); // local 확인 시 활성
  const res = await axios.get('https://codestory2-0-lxmudecxi-codestory2.vercel.app/games/css/main.js'); // local 확인 시 주석
  const data = res.data; // local 확인 시 주석
  res.status(200).json(data);
}