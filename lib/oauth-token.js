const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const qs = require('querystring');
const { serialize } = require('cookie');
const kakaoClientId = process.env.KAKAO_CLIENTID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENTID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = 'https://www.codestory.academy/gamestart';

module.exports = {

  getKakaoToken: async (req) => {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code', 
        client_id: kakaoClientId,
        client_secret: kakaoClientSecret,
        redirect_uri: redirectUri,
        code: req.body.authorizationCode
      })
    })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        console.log('kakao get token error');
        return null;
      });
    return response;
  },

  getGoogleToken: async (req) => {
    const response = await axios({
      url: 'https://www.googleapis.com/oauth2/v4/token',
      method: 'post',
      data: qs.stringify({
        code: req.body.authorizationCode,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      })
    })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        console.log('google get token error');
        return null;
      });
    return response;
  },

  sendAccessToken: (res, cookieName, accessToken) => {
    let oauthAccessToken = cookieName+' '+accessToken;
    res.setHeader('Set-Cookie', serialize('accessToken', oauthAccessToken, { path: '/', sameSite: 'strict', httpOnly: true })).status(200).json({ message: 'ok' });
  },

  isAuthorizedOauth: async (req) => {
    if (req.cookies && req.cookies.accessToken){
      let oauthLocation = req.cookies.accessToken.split(' ')[0];
      let accessToken = req.cookies.accessToken.split(' ')[1];
      if (oauthLocation === 'kakao') {
        const response = await axios({
          url: 'https://kapi.kakao.com//v2/user/me',
          metohod: 'get',
          headers: { 
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(res => {
            return res;
          })
          .catch(() => {
            console.log('kakao AuthorizedOauth error');
            return null;
          });
        return response;
      } else if (oauthLocation === 'google') {
        const response = await axios({
          url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          method: 'get',
          headers: {
            Authorization:`Bearer ${accessToken}`
          }
        })
          .then(res => {
            return res;
          })
          .catch(() => {
            console.log('google AuthorizedOauth error');
            return null;
          });
        return response;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
};