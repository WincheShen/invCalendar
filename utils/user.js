var user = {
  info: {},
  hasUserInfo: false,
  canIUse: wx.canIUse('button.open-type.getUserInfo')
}

const initUserInfo = function(info) {
  console.log(info)
  user.info = info
  user.hasUserInfo = true
}

// 获取用户信息
user.fromSetting = function() {
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => initUserInfo(res.userInfo)
        })
      }
    }
  })
}

var store = {},
  loadFnKey = 'loaded'

user.load = function(loaded, registerOnly) {
  loaded && !store[loadFnKey] && (store[loadFnKey] = loaded)
  if (registerOnly) {
    return;
  }

  if (user.hasUserInfo) {
    loaded && loaded(user.info)
  } else if (!user.hasUserInfo) {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        initUserInfo(res.userInfo)
        loaded && loaded(user.info)
      }
    })
  }
}

// bind button open-type.getUserInfo
user.getUserInfo = function(e) {
  if (e.detail.userInfo) {
    initUserInfo(e.detail.userInfo)
    store[loadFnKey] && store[loadFnKey](e.detail.userInfo)
  }
}

module.exports = user