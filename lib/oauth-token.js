const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const qs = require('querystring');
const { serialize } = require('cookie');
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/';

module.exports = {
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
    res.setHeader('Set-Cookie', [serialize('accessToken', oauthAccessToken, { path: '/', sameSite: 'strict', httpOnly: true }), 
      serialize('loginState', true, { path: '/', sameSite: 'strict' })]);
    res.statusCode = 200;
    res.json({ message: 'ok' });
  },
  isAuthorizedOauth: async (req) => {
    if (req.cookies && req.cookies.accessToken){
      let oauthLocation = req.cookies.accessToken.split(' ')[0];
      let accessToken = req.cookies.accessToken.split(' ')[1];
      if (oauthLocation === 'google') {
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