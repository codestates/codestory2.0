const { isAuthorizedJwt } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');
const models = require('../../lib/models');

export default async function user(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const jwt = await isAuthorizedJwt(req);
        const oauth = await isAuthorizedOauth(req);
        if (jwt) {
          const result = await models.users.findOne({ where: { id: jwt.id } });
          const follower = await models.follower_followeds.count({ where: { followedId: jwt.id } });
          const following = await models.follower_followeds.count({ where: { followerId: jwt.id } });
          const rankingArr = await models.users.findAll({ order: [['coin', 'DESC'], ['id', 'ASC']] });
          const idArr = rankingArr.map((user) => user.dataValues.id);
          const ranking = idArr.indexOf(jwt.id) + 1;
          res.status(200).json({
            username: result.userId,
            photourl: result.pictureurl,
            coin: result.coin,
            intro: result.word,
            ranking,
            follower,
            following
          });
        } else if (oauth) {
          let username, photourl;
          if (oauth.data.kakao_account) {
            username = oauth.data.properties.nickname;
            photourl = oauth.data.properties.profile_image;
          } else {
            username = oauth.data.name;
            photourl = oauth.data.picture;
          }
          res.status(200).json({
            username: username,
            photourl: photourl,
            coin: 0,
            intro: '반갑습니다.',
            ranking: 10000,
            follower: 0,
            following: 0
          });
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