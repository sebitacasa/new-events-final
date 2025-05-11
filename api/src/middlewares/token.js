const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require('dotenv').config();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`, // 👈 muy importante
  }),
  audience: process.env.AUTH0_AUDIENCE, // 👈 este es el audience que configuras en Auth0
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});



  
module.exports = checkJwt;
