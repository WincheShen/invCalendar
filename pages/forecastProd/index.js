'use strict';

const {
  post,
  user
} = require('../../utils/index.js')

Object.defineProperty(exports, "__esModule", {
  value: true
});

Page({
  data: {
    ready4Sell: ['稳赢安E-财富系很长很长很长很长很长很长很长很长'],
    disabled: false,
    currId: null,
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
    post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate', {})
      .then(res => page.setData({
        ready4Sell: res.data.data.ready4Sell
      }));
  },
  onShow() {
    user.load(this.saveNoticeCallback, true);
  },
  getUserInfo: user.getUserInfo,
  noticeMe(e) {
    this.setData({
      currId: e.currentTarget.dataset.id
    })
  },
  saveNoticeCallback() {
    if (user.hasUserInfo) {
      wx.showToast({
        title: '已成功订阅通知',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        disabled: true
      });
      console.log("id:" + this.data.currId);
    }
  },
  queryProduct: function(productTitle) {
    console.log("查询产品");
    this.onLoad();
  }
})