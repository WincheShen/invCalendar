'use strict';

const {
  post
} = require('../../utils/index.js')

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = Page({
  data: {
    ready4Sell: ['稳赢安E-财富系很长很长很长很长很长很长很长很长'],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    disabled: false,
    // array: [{
    //   'name': '稳赢安E-财富系列',
    //   'date': '9月1日 0点',
    //   'buttonName': '通知我'
    // }, {
    //   'name': '稳赢安E-财富系列',
    //   'date': '9月2日 0点',
    //   'buttonName': '通知我'
    // }, {
    //   'name': '稳赢安E-财富系列',
    //   'date': '9月3日 0点',
    //   'buttonName': '通知我'
    // }, {
    //   'name': '稳赢安E-财富系列',
    //   'date': '9月4日 0点',
    //   'buttonName': '通知我'
    // }, {
    //   'name': '稳赢安E-财富系列',
    //   'date': '9月5日 0点',
    //   'buttonName': '通知我'
    // }, {
    //   'name': '稳赢安E-财富系列',
    //   'date': '9月6日 0点',
    //   'buttonName': '通知我'
    // }, {
    //   'name': '稳赢安E-财富系列',
    //   'date': '9月7日 0点',
    //   'buttonName': '通知我'
    // }]
  },
  onLoad: function() {
    var page = this;
    console.log("加载产品预告页");
    post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate').then(res => page.setData({
      ready4Sell: res.data.data.ready4Sell
    }));
  },
  notice: function (event) {
    var page = this;
    var buttonId = event.target.id;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //已经授权，可以直接保存产品预定通知
          page.saveNotice(buttonId);
        } else {
          //未授权，需要先授权再保存
          page.authUser(buttonId);
        }
      }
    })
  },
  authUser: function (id) {
    console.log("授权信息页")
    var page = this;
    wx.showModal({
      title: '微信授权',
      content: '申请获得你的公开信息(呢称、头像等)',
      cancelText: '拒绝',
      confirmText: '允许',
      success: function (res) {
        if (res.confirm) {
          page.saveNotice(id);
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  saveNotice: function (id) {
    console.log("保存用户订阅的产品上架前通知");
    var page = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo);
        console.log(res.encryptedData);
        page.saveNoticeCallback(id);
      }
    })
    this.saveNoticeCallback(id);
  },
  saveNoticeCallback: function (id) {
    wx.showToast({
      title: '已成功订阅通知',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      disabled: true
    });
    console.log("id:" + id);
  },
  queryProduct: function (productTitle) {
    console.log("查询产品");
    this.onLoad();
  }
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLRUEsUUFBTSIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfkuqflk4HpooTlkYonLFxuICAgIHVzaW5nQ29tcG9uZW50czoge31cbiAgfSxcbiAgZGF0YToge31cbn0iXX0=