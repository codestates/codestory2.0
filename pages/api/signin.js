const { generateAccessToken, sendAccessToken } = require('../../lib/json-token');
const db = require('../../lib/models');
const crypto = require('crypto');


export default async function signin(req, res) {
  switch (req.method) {
  case 'POST':
    try {
      const password = req.body.password;
      const username = req.body.username;
      console.log(password);
      const userInfo = await db.users.findOne({
        where: { userId: username }
      });
      if (!userInfo) {
        res.status(400).json({ message: 'badrequest' });
      } else {
        const salt = userInfo.dataValues.salt;
        crypto.randomBytes(64, (err, buf) => {
          crypto.pbkdf2(password, salt, 98235, 64, 'sha512', async (err, key) => {
            const incomingPassword = key.toString('base64');
            if (incomingPassword === userInfo.dataValues.password) {
              delete userInfo.dataValues.password;
              delete userInfo.dataValues.salt;
              const accessToken = generateAccessToken(userInfo.dataValues);
              sendAccessToken(res, accessToken);
              // res.status(200).json({ data: userInfo.dataValues }); 암호화 상태 확인 코드
            } else {
              res.status(400).json({ message: 'badrequest' });
            }
          });
        });
      }
    }
    catch (error) {
      res.status(500).json({ message: 'Sorry Can\'t process your request' });
      throw error;
    } break;
  default:
    res.status(404).json({ message: `You can't use ${req.method} method.` });
  }
}