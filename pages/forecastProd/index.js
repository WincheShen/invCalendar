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
    ready4Sell: [''],
    disabled: false,
    currId: null,
  },
  onLoad: function(options) {
    var prodList = options.productList;
    if (prodList != null && prodList != undefined && prodList.length > 0) {
      prodList = prodList.split(',');
    }
    // console.log(prodList + prodList.length);
    var page = this;
    console.log("加载产品预告页");
    this.setData({
      ready4Sell: prodList
    })
    // post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate', {})
    //   .then(res => page.setData({
    //     ready4Sell: res.data.data.ready4Sell
    //   }));
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
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
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