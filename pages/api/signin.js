const { generateAccessToken, sendAccessToken } = require('../../lib/json-token');
const db = require('../../lib/models');

export default async function signin(req, res) {
  switch (req.method) {
  case 'POST':
    try {
      const userInfo = await db.users.findOne({
        where: { userId: req.body.username, password: req.body.password }
      });
      if (!userInfo) {
        res.status(400).json({ message: 'badrequest' });
      } else {
        delete userInfo.dataValues.password;
        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);
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