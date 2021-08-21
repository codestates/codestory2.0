const { isAuthorizedJwt } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');
const models = require('../../lib/models');

export default async function follow(req, res) {
  switch (req.method) {
  case 'POST':
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt) {
        const followed = await models.users.findOne({ where: { userId: req.body.username } });
        await models.follower_followeds.create({
          followerId: jwt.id,
          followedId: followed.dataValues.id
        });
        res.json({ result: true });
      } else if (oauth) {
        res.json({ result: false });
      } else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ message : 'Sorry Can\'t process your request' });
      throw error;
    } break;

  case 'DELETE':
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt) {
        const followed = await models.users.findOne({ where: { userId: req.body.username } });
        await models.follower_followeds.destroy({ where: {
          followerId: jwt.id,
          followedId: followed.dataValues.id
        } });
        res.json({ message: 'ok' });
      } else if (oauth) {
        res.json({ message: 'ok' });
      } else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ message : 'Sorry Can\'t process your request' });
      throw error;
    } break;

  case 'GET':
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt) {
        const followingArr = await models.follower_followeds.findAll({ where: { followerId: jwt.id }, order: [['id', 'DESC']] });
        const userArr = await models.users.findAll();
        const userinfoArr = [];
        for (let record of userArr) {
          userinfoArr[record.dataValues.id] = { username: record.dataValues.userId, photourl: record.dataValues.pictureUrl };
        }
        res.json({ data: followingArr.map((record) => userinfoArr[record.dataValues.followedId]) });
      } else if (oauth) {
        res.json({ data: [{ username: '회원가입 하시면', photourl: '' }, { username: '이용하실 수 있습니다', photourl: '' }] });
      } else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ message : 'Sorry Can\'t process your request' });
      throw error;
    } break;
  }
}