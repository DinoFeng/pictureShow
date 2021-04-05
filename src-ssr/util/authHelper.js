const _ = require('lodash')
const { logger } = require('./logger')
const jwt = require('jsonwebtoken')

const authHelper = (req, res, next) => {
  // logger.info('Checking...login');
  // setTimeout(function() {next()},  1000);
  try {
    const authorization = _.get(req, ['headers', 'authorization'], '')
    // logger.debug({ authorization });
    const auth = authorization.split(' ')

    const tokenStr = auth[0].toLowerCase() === 'bearer' ? auth[1] : auth[0]
    // logger.debug({ tokenStr });

    if (tokenStr) {
      req.token = tokenStr
      const profile = jwt.decode(tokenStr)
      const email = _.get(profile, ['unique_name'])
      const userNt = email.split('@')[0].toLowerCase()
      const givenName = _.get(profile, ['given_name'])
      const familyName = _.get(profile, ['family_name'])
      req.userInfo = {
        profile,
        email,
        userNt,
        userName: `${givenName} ${familyName}`,
        getGenUserInfo,
      }
      // logger.debug(req.userInfo);
    }
  } catch (err) {
    logger.error(err)
  }
  next()
}

module.exports = {
  authHelper,
}
