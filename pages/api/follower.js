const { isAuthorizedJwt } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');
const db = require('../../lib/models');

export default async function user(req, res) {
  switch (req.method) {
  case 'GET':
    try {
      console.log(req);
      const jwt = await isAuthorizedJwt(req);
      const oauth = null;  //await isAuthorizedOauth(req);
      if (jwt) {
        const result = await models.users.findOne({ where: { id: jwt.id } });
        const follower = await models.follower_followeds.count({ where: { followedId: jwt.id } });
        const following = await models.follower_followeds.count({ where: { followerId: jwt.id } });
        const rankingArr = await models.users.findAll({ order: [['score', 'DESC'], ['id', 'ASC']] });
        const idArr = rankingArr.map((user) => user.dataValues.id);
        const ranking = idArr.indexOf(jwt.id) + 1;
        console.log(result);
        res.status(200).json({
          username: result.userId,
          photourl: result.pictureUrl,
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
    try {
        const jwt = await isAuthorizedJwt(req);
        const oauth = await isAuthorizedOauth(req);
        if (jwt) {
          const followed = await db.users.findOne({ where: { userId: req.body.username } });
          await db.follower_followeds.create({
            followerId: jwt.id,
            followedId: followed.dataValues.id
          });
          res.json({ result: true });
        }else if(oauth){
          res.json({ result: false});
        }
        else {
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
              const followed = await db.users.findOne({ where: { userId: req.body.username } });
              await db.follower_followeds.destroy({ where: {
                followerId: jwt.id,
                followedId: followed.dataValues.id
              } });
              res.json({ message: 'ok' });
            } else if (oauth) {
              res.json({message:'ok'});
            } else {
              res.status(400).json({ message: 'InvalidToken' });
            }
          }
          catch (error) {
            res.status(500).json({ message : 'Sorry Can\'t process your request' });
            throw error;
          }
  default:
    res.status(404).json({ message: `You can't use ${req.method} method.` });
  }
}




module.exports = {

  follow: async (req, res) => {
    
  },

  unFollow: async (req, res) => {
    
  },

  sendFollowingList: async (req, res) => {
    try {
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt) {
        const followingArr = await db.follower_followeds.findAll({ where: { followerId: jwt.id }, order: [['id', 'DESC']] });
        const userArr = await db.users.findAll();
        const userinfoArr = [];
        for (let record of userArr) {
          userinfoArr[record.dataValues.id] = { username: record.dataValues.userId, photourl: record.dataValues.pictureurl };
        }
        res.json({ data: followingArr.map((record) => userinfoArr[record.dataValues.followedId]) });
      } else if (oauth) {
        res.json({ data: [{ username: '회원가입 하시면', photourl: '../?' }, { username: '이용하실 수 있습니다', photourl: '../?' }] });
      } else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).json({ message : 'Sorry Can\'t process your request' });
      throw error;
    }
  },
};
