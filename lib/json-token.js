require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
import { serialize } from 'cookie';

module.exports = {

  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '36000s' });
  },

  sendAccessToken: (res, accessToken) => {
    const jwtAccessToken = 'jwt '+accessToken;
    res.setHeader('Set-Cookie', serialize('accessToken', jwtAccessToken, { path: '/', sameSite: 'strict', httpOnly: true })).status(200).json({ message: 'ok' });
  },

  isAuthorizedJwt: (req) => {
    if (req.cookies && req.cookies.accessToken) {
      const jwt = req.cookies.accessToken.split(' ')[1];
      if (!jwt) {
        return null;
      }
      try {
        return verify(jwt, process.env.ACCESS_SECRET);
      }
      catch {
        return null;
      }
    } else {
      return null;
    }
  }
};