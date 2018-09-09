'use strict';
//js

Object.defineProperty(exports, "__esModule", {
  value: true
});

const {
  user,
  post,
  relativeDate,
  formatDate2Array
} = require('../../utils/index.js');

const app = getApp();

const qsAsDate_y_m_d = function(dateArr) {
  if (!dateArr || dateArr.length != 3) {
    return ''
  }
  const [y, m, d] = dateArr
  return `y=${y}&m=${m<10?'0'+m:m}&d=${d<10?'0'+d:d}`
}

exports.default = Page({
  data: {
    indicator: false,
    autoplay: false,
    user: {},
    dateArray: null,
    dateList: null,
    currentGesture: 0, //标识手势
    currentid: 8,
    likeIcon: "star",
    calendarData: {
      calendarId: "111111",
      bgImg: "http://",
      lunarDate: "8月十五",
      lunarIntro: "中秋",
      suitFor: "投资",
      unsuitFor: "取现",
      liked: "50",
      isLiked: "true",
      isCollected: "true",
      commented: "100",
      ready4Sell: [
        "安E",
        "财富计划"
      ],
      detail: {
        "intro": "世人投资，第一要有度，第二要有心，第三要有恒。有度，方能知进退；有心，能辨利与害；有恒，则积长久之财。\n\n\n 陆金所：投资谏言",
        "hyperLink": "http://"
      }
    },
    action: ''
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  onLoad: function() {
    user.load(this.updateUserInfo);
    console.log(user.hasUserInfo)
    console.log(user.canIUse)
    console.log(user.info.nickName)
    if (this.data.dateList === null || this.data.dateList === undefined) {
      this.dateSetting(new Date());
    }
    this.dataLoad(new Date());
  },
  getUserInfo: user.getUserInfo,
  updateUserInfo(userInfo) {
    this.setData({
      user: user,
    })
    this.runAction()
  },
  runAction() {
    if (this.data.action) {
      this.data.action()
    }
    this.setData({
      action: ''
    })
  },
  viewComments: function() {
    if (user.hasUserInfo) {
      wx.navigateTo({
        url: `../comments/index?${qsAsDate_y_m_d(this.data.dateArray)}`,
      })
    } else {
      this.setData({
        action: this.viewComments
      })
    }
  },
  viewForecast: function() {
    wx.navigateTo({
      url: '../forecastProd/index',
    })
  },
  viewMyFavorite: function() {
    if (user.hasUserInfo) {
      wx.navigateTo({
        url: '../favorite/index',
      })
    } else {
      this.setData({
        action: this.viewComments
      })
    }
  },
  dataLoad: function(currentDate) {
    var that = this;
    this.setData({
      dateArray: formatDate2Array(currentDate)
    })
    // post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate', {
    post('https://dsn.apizza.net/mock/21031c3f5ec7087ab6306752ca3bee11/home/getInvestmentInfoByDate', {
      date: currentDate,
      userId: 'chenyan789'
    }).then(
      function(data) {
        // console.log(data.data.data);
        console.log(data);
        // calendarData = data.data.data;
        that.setData({
          calendarData: data.data.data,
        })
      }
    );
  },
  dateSetting: function(curDate) {
    var dates = [];
    var j = 0;
    for (var i = -7; i < 8; i++) {
      dates[j] = relativeDate(curDate, i);
      j++;
    }
    this.setData({
      dateList: dates
    })
  },
  change: function(data) {
    this.dataLoad(this.data.dateList[data.detail.current]);
  },
  doLike: function() {
    var that = this;
    post('https://dsn.apizza.net/mock/21031c3f5ec7087ab6306752ca3bee11/interaction/iLike', {
      calendarId: this.data.calendarData.calendarId,
      userId: 'chenyan789',
      isLiked: !this.data.calendarData.isLiked
    }).then(
      function(data) {
        // console.log(data.data.data);
        console.log(data);
        var calendar = that.data.calendarData;
        var addNum = calendar.isLiked ? -1 : 1;
        var num = parseInt(calendar.liked) + addNum;
        calendar.isLiked = !calendar.isLiked;
        calendar.liked = num;
        console.log(that.data.calendarData.isLiked);
        that.setData({
          calendarData: calendar,
        })

      }
    );
  },
  doCollection: function() {
    var that = this;
    post('https://dsn.apizza.net/mock/21031c3f5ec7087ab6306752ca3bee11/interaction/add2collection', {
      calendarId: this.data.calendarData.calendarId,
      userId: 'chenyan789',
      isCollect: !this.data.calendarData.isCollected
    }).then(
      function(data) {
        // console.log(data.data.data);
        console.log(data);
        var calendar = that.data.calendarData;
        calendar.isCollected = !calendar.isCollected;
        // calendarData = data.data.data;
        that.setData({
          calendarData: calendar,
        })
      }
    );
  }
});