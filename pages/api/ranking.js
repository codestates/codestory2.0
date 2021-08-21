const { isAuthorizedJwt } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');
const models = require('../../lib/models');

export default async function ranking(req, res) {
  switch (req.method) {
  case 'GET':
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt) {
        const rankingArr = await models.users.findAll({ order: [['coin', 'DESC'], ['id', 'ASC']] });
        const followedArr = await models.follower_followeds.findAll({ where: { followerId: jwt.id } });
        const isFollowed = [];
        for (let record of followedArr) {
          isFollowed[record.dataValues.followedId] = true;
        }
        res.status(200).json({ data: rankingArr.map((record) => ({
          username: record.dataValues.userId,
          photourl: record.dataValues.pictureUrl,
          score: record.dataValues.score,
          following: record.dataValues.id === jwt.id ? 'me' : Boolean(isFollowed[record.dataValues.id])
        }))});
      } else if (oauth) {
        const rankingArr = await models.users.findAll({ order: [['coin', 'DESC'], ['id', 'ASC']] });
        res.status(200).json({ data: rankingArr.map((record) => ({
          username: record.dataValues.userId,
          photourl: record.dataValues.pictureUrl,
          score: record.dataValues.score,
          following: false
        })) });
      } else {
        res.status(400).json({ message: 'InvalidToken' });
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
