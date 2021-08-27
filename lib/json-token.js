require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const { serialize } = require('cookie');

module.exports = {

  generateAccessToken: (data) => {
    return sign(data, process.env.NEXT_PUBLIC_ACCESS_SECRET, { expiresIn: '36000s' });
  },

  sendAccessToken: (res, accessToken) => {
    const jwtAccessToken = 'jwt '+accessToken;
    res.setHeader('Set-Cookie', [serialize('accessToken', jwtAccessToken, { path: '/', sameSite: 'strict', httpOnly: true }), 
      serialize('loginState', true, { path: '/', sameSite: 'strict' })]);
    res.statusCode = 200;
    res.json({ message: 'ok' });
  },

  isAuthorizedJwt: (req) => {
    if (req.cookies && req.cookies.accessToken) {
      const jwt = req.cookies.accessToken.split(' ')[1];
      if (!jwt) {
        return null;
      }
      try {
        return verify(jwt, process.env.NEXT_PUBLIC_ACCESS_SECRET);
      }
      catch {
        return null;
      }
    } else {
      return null;
    }
  }
};