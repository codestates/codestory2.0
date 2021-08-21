const { getGoogleToken, sendAccessToken } = require('../../lib/oauth-token');


export default async function oauthlogin(req, res) {
  switch (req.method) {
  case 'POST':
    try {
      const googleData = await getGoogleToken(req);
      if (googleData) {
        const oauthAccessToken = googleData.access_token;
        sendAccessToken(res, 'google', oauthAccessToken);
      } else {
        res.status(400).json({ message: 'invalid Authorization Code' });
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