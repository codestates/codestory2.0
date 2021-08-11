const fs = require('fs'); // local 확인 시 활성
// const axios = require('axios'); // local 확인 시 주석

export default async function css(req, res) {
  const data = fs.readFileSync('games/css/main.js'); // local 확인 시 활성
  // const cssRes = await axios.get('https://feat-amplify-deploy.drl7u5zwhcbcc.amplifyapp.com/games/css/main.js'); // local 확인 시 주석
  const data = cssRes.data; // local 확인 시 주석
  res.status(200).json(data);
}