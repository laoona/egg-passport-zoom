/**
 * @author: laoona
 * @date:  2021-08-12
 * @time: 16:51
 * @contact: laoono.com
 * @description: #
 */

const Strategy = require('./lib').Strategy;

module.exports = app => {
  const config = app.config.passportZoom;
  config.passReqToCallback = true;
  config.clientID = config.key;
  config.clientSecret = config.secret;
  config.authorizationURL = config.baseURL;

  // must require `req` params
  app.passport.use('zoom', new Strategy(config, (req, accessToken, refreshToken, params, profile, done) => {
    // format user
    const user = {
      provider: 'zoom',
      id: profile.id,
      name: profile.name,
      displayName: profile.displayName,
      photo: profile.avatarUrl,
      accessToken,
      refreshToken,
      params,
      profile,
    };

    // let passport do verify and call verify hook
    app.passport.doVerify(req, user, done);
  }));
};
