const { isAuthorizedJwt, generateAccessToken, sendAccessToken } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');
const models = require('../../lib/models');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

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
        const rankingArr = await models.users.findAll({ order: [['score', 'DESC'], ['id', 'ASC']] });
        const idArr = rankingArr.map((user) => user.dataValues.id);
        const ranking = idArr.indexOf(jwt.id) + 1;
        res.status(200).json({
          username: result.userId,
          photourl: result.pictureUrl,
          coin: result.coin,
          intro: result.word,
          score: result.score,
          ranking,
          follower,
          following
        });
      } else if (oauth) {
        let username = oauth.data.name;
        let photourl = oauth.data.picture;
        res.status(200).json({
          username: username,
          photourl: photourl,
          coin: 0,
          score: 0,
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
  case 'POST':
    try{
      const username = req.body.username;
      const password = req.body.password;
      const data = await models.users.findOne({ where : { userId: username } });
      if (data) {
        res.status(400).json({ message:'Bad Request' });
      } else {
        const time = Date.now();
        crypto.randomBytes(64, (err, buf) => {
          const newSalt = buf.toString('base64');
          crypto.pbkdf2(password, newSalt, 98235, 64, 'sha512', async (err, key) => {
            const newPassword = key.toString('base64');
            const result = await models.users.create({
              pictureUrl: '',
              userId: username,
              password: newPassword,
              salt: newSalt,
              coin: 0,
              score: 0,
              word: '안녕하세요',
              createdAt: time,
              updatedAt: time,
            });
            delete result.dataValues.password;
            delete result.dataValues.salt;
            const accessToken = await generateAccessToken(result.dataValues);
            sendAccessToken(res, accessToken);
          });
        });
      }  
    }
    catch (error) {
      res.status(500).json({ message: 'Sorry Can\'t process your request' });
      throw error;
    } break;
  case 'PATCH': 
    try{
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (req.body.data && req.body.data.type) {
        if (req.body.data.type === 'score') {
          if (jwt) {
            await models.users.update({ score: req.body.data.score }, { where: { id: jwt.id } });
            res.status(200).json({ message: 'ok' });
          } else if (oauth) {
            res.status(200).json({ message: 'ok' });
          } else {
            res.status(400).json({ message: 'InvalidToken' });
          }
        } else if (req.body.data.type === 'word') {
          if (jwt) {
            await models.users.update({ word: req.body.data.word }, { where: { id: jwt.id } });
            res.status(200).json({ message: 'ok' });
          } else if (oauth) {
            res.status(200).json({ message: 'ok' });
          } else {
            res.status(400).json({ message: 'InvalidToken' });
          }
        }
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
