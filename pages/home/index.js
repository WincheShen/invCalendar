'use strict';
//js

Object.defineProperty(exports, "__esModule", {
  value: true
});

const {
  user,
  post,
  relativeDate,
  formatDate2Array,
  formatDate
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
    curDate: null,
    user: null,
    dateArray: null,
    dateList: null,
    currentGesture: 0, //标识手势
    currentid: 8,
    likeIcon: "star",
    calendarData: null,
    action: ''
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  onLoad: function(options) {
    var curDate = options.curDate;
    if (curDate == null || curDate === undefined) {
      curDate = new Date();
    }else{
      curDate = new Date(curDate);
    }
    if (this.data.dateList === null || this.data.dateList === undefined) {
      this.dateSetting(curDate);
    }
    
    this.dataLoad(curDate);
  },
  onShow() {
    user.load(this.updateUserInfo);
  },
  getUserInfo: user.getUserInfo,
  updateUserInfo(userInfo) {
    this.setData({
      user:user
    });
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
    var prodListStr = "";
    if (this.data.calendarData.ready4Sell != null && this.data.calendarData.ready4Sell!= undefined){
      prodListStr = this.data.calendarData.ready4Sell.join('|');
    }
    wx.navigateTo({
      url: '../forecastProd/index?productList=' + this.data.calendarData.ready4Sell
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
    post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate', {
      date: formatDate(currentDate),
      userId: this.data.user==undefined?null:user.info.nickName
    }).then(
      function(data) {
        var calendarData = data.data.data;
        calendarData.isLiked = calendarData.isLiked === 'true' ? true : false;
        calendarData.isCollected = calendarData.isCollected === 'true' ? true : false;
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
      curDate: curDate,
      dateList: dates
    })
  },
  change: function(data) {
    this.dataLoad(this.data.dateList[data.detail.current]);
  },
  doLike: function() {
    var that = this;
    post('https://contest.lujs.cn/bs-opcam/interaction/iLike', {
      calendarId: this.data.calendarData.calendarId,
      userId: this.data.user == undefined ? null : this.data.user.info.nickName,
      isLiked: !this.data.calendarData.isLiked
    }).then(
      function(data) {
        // console.log(data.data.data);
        console.log(data);
        var calendar = that.data.calendarData;
        var addNum = calendar.isLiked?-1:1;
        var num = calendar.liked;
        calendar.isLiked = !calendar.isLiked;
        calendar.liked = num+addNum;
        that.setData({
          calendarData: calendar,
        })

      }
    );
  },
  doCollection: function() {
    var that = this;
    post('https://contest.lujs.cn/bs-opcam/interaction/add2collection', {
      calendarId: this.data.calendarData.calendarId,
      userId: this.data.user == undefined ? null : this.data.user.info.nickName,
      isCollect: !this.data.calendarData.isCollected
    }).then(
      function(data) {

        var calendar = that.data.calendarData;
        calendar.isCollected = !calendar.isCollected;

        // calendarData = data.data.data;
        that.setData({
          calendarData: calendar,
        })
      }
    );
  },
  doShareAppMessage: function(){
    return {
      title: this.data.calendarData.lunarDate,
      path: '/home/index?curDate=' + formatDate(this.data.curDate),
    }
  },
  openSourceLink: function(){
    wx.showToast({
      title: '个人版无法打开链接',
      icon: 'none',
      duration: 1000
    })
  }
});