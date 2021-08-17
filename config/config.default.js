'use strict';

/**
 * egg-passport-zoom default config
 * @member Config#passportZoom
 * @property {String} SOME_KEY - some description
 */
exports.passportZoom = {
  key: 'your key',
  secret: 'your secret',
  callbackURL: '/passport/zoom/callback',
  // baseURL: 'https://zoom.us/oauth/authorize', // 可修改为本地部署的gitlab地址
  baseURL: 'https://zoom.us', // 可修改为本地部署的gitlab地址
};
