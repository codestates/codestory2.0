import { serialize } from 'cookie';
const { isAuthorizedJwt } = require('../../lib/json-token');
const { isAuthorizedOauth } = require('../../lib/oauth-token');

export default async function signout(req, res) {
  switch (req.method) {
  case 'GET':
    try{
      const jwt = await isAuthorizedJwt(req);
      const oauth = await isAuthorizedOauth(req);
      if (jwt || oauth) {
        res.setHeader('Set-Cookie', serialize('accessToken', 'jwt invalidToken', { path: '/', sameSite: 'strict', httpOnly: true }));
        res.statusCode = 200;
        res.json({ message: 'ok' });
      } else {
        res.status(400).json({ message: 'InvalidToken' });
      }
    }
    catch (error) {
      res.status(500).send({ message: 'Sorry Can\'t process your request' });
      throw error;
    } break;
  default:
    res.status(404).json({ message: `You can't use ${req.method} method.` });
  }
}