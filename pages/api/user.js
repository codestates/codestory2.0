const { isAuthorizedJwt } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');
const models = require('../../lib/models');
const crypto = require('crypto');


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
              const newPassword=key.toString('base64');
              console.log('newSalt: ', newSalt);
              console.log('newPassword', newPassword)
              const result= await models.users.create({
                pictureurl: '../?',
                userId: username,
                password: newPassword,
                salt: newSalt,
                coin:0,
                createdAt: time,
                updatedAt: time,

              })
              key.toString('base64');
            });
          });


          const result = await models.users.create({
            pictureurl: '../?',
            userId : username,
            password : password,
            coin : 0,
            createdAt : time,
            updatedAt : time
          });
          delete result.dataValues.password;
          const accessToken = generateAccessToken(result.dataValues);
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