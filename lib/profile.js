/**
 * @author: laoona
 * @date:  2021-08-12
 * @time: 17:41
 * @contact: laoono.com
 * @description: #
 */

exports.parse = function(json) {
  if (typeof json === "string") {
    json = JSON.parse(json);
  }

  const profile = {};

  profile.id = json.id;

  profile.displayName = json.first_name + " " + json.last_name;
  profile.name = { familyName: json.last_name, givenName: json.first_name };

  if (json.email) {
    profile.emails = [{ value: json.email }];
  }

  if (json.pic_url) {
    profile.photos = [{ value: json.pic_url }];
  }

  return profile;
};
