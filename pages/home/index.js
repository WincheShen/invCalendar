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
    user.load(this.updateUserInfo);
    var curDate = options.curDate;
    if (curDate == null || curDate === undefined) {
      curDate = new Date();
    }
    if (this.data.dateList === null || this.data.dateList === undefined) {
      this.dateSetting(curDate);
    }
    
    this.dataLoad(curDate);
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
    console.log(formatDate(currentDate));
    post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate', {
    // post('https://dsn.apizza.net/mock/21031c3f5ec7087ab6306752ca3bee11/home/getInvestmentInfoByDate', {
      date: formatDate(currentDate),
      userId: this.data.user==undefined?null:user.info.nickName
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
      isLiked: this.data.calendarData.isLiked === "false"? "true": "false"
    }).then(
      function(data) {
        // console.log(data.data.data);
        console.log(data);
        var calendar = that.data.calendarData;
        var addNum = -1;
        if (calendar.isLiked === "false") {
          calendar.isLiked = "true";
          addNum = 1;
        } else {
          calendar.isLiked = "false";
        }
        var num = parseInt(calendar.liked) + addNum;
        calendar.isLiked = !calendar.isLiked;
        calendar.liked = num;
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
      isCollect: this.data.calendarData.isCollected==="false"?"true":"false"
    }).then(
      function(data) {
        // console.log(data.data.data);
        // console.log(data);
        var calendar = that.data.calendarData;
        if (calendar.isCollected==="false"){
          calendar.isCollected = "true";
        }else{
          calendar.isCollected = "false";
        }
         
        // calendarData = data.data.data;
        that.setData({
          calendarData: calendar,
        })
      }
    );
  }
});