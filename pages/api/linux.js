const fs = require('fs'); //local 확인 시 활성
// const axios = require('axios'); //local 확인 시 주석

export default async function linux(req, res) {
  const data = fs.readFileSync('games/linux/main.js'); //local 확인 시 활성
  // const linuxRes = await axios('https://dev.d230bhotgxrf7n.amplifyapp.com/games/linux/main.js'); //local 확인 시 주석
  // const data = linuxRes.data; //local 확인 시 주석
  res.status(200).json(data);
}