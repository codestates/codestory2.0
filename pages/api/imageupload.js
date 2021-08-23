const { isAuthorizedJwt } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');
const models = require('../../lib/models');
const multer = require('multer');
const moment = require('moment');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

export default async (req, res) => {
  switch(req.method) {
  case 'PATCH':
    try{
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt) {
        const s3 = new aws.S3({
          accessKeyId: process.env.AW_ACCESSKEY,
          secretAccessKey: process.env.AW_SECRETKEY, 
          region: 'ap-northeast-2' 
        });
        const storage = multerS3({
          s3: s3,
          bucket: 'codestoryimagecontainor',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          acl: 'public-read',   
          metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname }); 
          },
          key: function (req, file, cb) {
            cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname);
          }
        });
        const upload = multer({ storage: storage }).single('file');
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            return next(err);
          } else if (err) {
            return next(err);
          }
          models.users.update({ pictureUrl: req.file.location }, { where: { id: jwt.id } });
          return res.status(200).json(req.file.location);
        });
      } else if (oauth) {
        return res.status(200).json('https://codestoryimagecontainor.s3.ap-northeast-2.amazonaws.com/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85+%EA%B6%8C%EC%9C%A0+%EC%9D%B4%EB%AF%B8%EC%A7%80.png');
      } else {
        return res.status(400).json({ message: 'invalid token' });
      }
    }
    catch (error) {
      res.status(500).json({ message: 'Sorry Can\'t process your request' });
      throw error;
    } break;
  default :
    res.status(404).json({ message: `You can't use ${req.method} method.` });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
