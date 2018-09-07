const wxrequest = require('./request.js')

const post = function(url, data) {
  return wxrequest.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  });
}

const get = function(url, data) {
  return wxrequest.request({
    url: url,
    data: data,
    method: 'GET',
    header: {
      'content-type': 'application/json'
    }
  });
}

module.exports = {
  post: post,
  get: get,
  user: require('./user.js')
}