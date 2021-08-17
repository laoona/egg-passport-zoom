/**
 * @author: laoona
 * @date:  2021-08-12
 * @time: 16:59
 * @contact: laoono.com
 * @description: #
 */

const util = require("util");
const OAuth2Strategy = require("passport-oauth2");
const InternalOAuthError = require("passport-oauth2").InternalOAuthError;
const Profile = require("./profile");

/* @constructor
* @param {object} options
* @param {function} verify
* @access public
*/

function Strategy(options, verify) {
  options = options || {};

  options.authorizationURL = options.authorizationURL || "https://zoom.us/oauth/authorize";
  options.tokenURL = options.tokenURL || "https://zoom.us/oauth/token";

  OAuth2Strategy.call(this, options, verify);

  this.name = "zoom";
  this.options = options;
  this._profileUrl = options.profileUrl || "https://api.zoom.us/v2/users/me";
}


// Inherit from `OAuth2Strategy`
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Zoom.
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */

Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._profileUrl, accessToken, function(err, body, res) {
    let json;

    if (err) {
      return done(new InternalOAuthError("Failed to fetch user profile", err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error("Failed to parse user profile"));
    }

    let profile = Profile.parse(json);

    profile.provider = "zoom";
    profile._raw = body;
    profile._json = json;

    done(null, profile);
  });
};

module.exports = Strategy;
