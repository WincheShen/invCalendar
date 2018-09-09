const wxrequest = require('./request.js')

const post = function(url, data) {
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading()
    wxrequest.request({
        url: url,
        data: data,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(r => {
        return resolve({
          success: r.statusCode == 200 && r.data && r.data.responseCode == 200,
          data: r.data
        })
      }).then(() => wx.hideNavigationBarLoading())
      .catch(e => {
        wx.hideNavigationBarLoading()
        reject(e)
      })
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

const extend = Object.assign

const utils = require('./utils.js')

module.exports = extend({
  extend,
  post,
  get,
  user: require('./user.js'),
  apiBase: 'https://contest.lujs.cn/bs-opcam'
}, utils)