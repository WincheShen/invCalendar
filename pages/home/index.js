'use strict';
//js

Object.defineProperty(exports, "__esModule", {
  value: true
});

const {
  user,
<<<<<<< HEAD
  post
} = require('../../utils/index.js');

const app = getApp();

const util = require('../../utils/utils.js');

exports.default = Page({
  data: {
    indicator: false,
    autoplay: false,
    user: null,
    dateArray: null,
    dateList: null,
=======
  post,
  daysJia,
  daysJian,
  formatMonth,
  formatDay
} = require('../../utils/index.js')

var currentDate = null;

var solarPeriodText = '禾乃登';
var lunarDateText = '瓜时 七月廿二';
var suitForText = "买菜";
var unsuitForText = "理财";

post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate', {
  'date': '20180907',
  'userId': 'chenyan821'
}).then(function(res) {
  console.log(res.data);
})

exports.default = Page({
  data: {
    monthText: formatMonth(currentDate),
    dayText: formatDay(currentDate),
    solarPeriod: solarPeriodText,
    lunarDate: lunarDateText,
    suitFor: suitForText,
    unsuitFor: unsuitForText,
    lastX: 0, //滑动开始x轴位置
    lastY: 0, //滑动开始y轴位置
    text: "没有滑动",
>>>>>>> hook the api for coments
    currentGesture: 0, //标识手势
    currentid: 8,
    likeIcon: "star",
    calendarData: {
      calendarId: "111111",
      bgImg: "http://",
      lunarDate: "8月十五1",
      lunarIntro: "中秋",
      suitFor: "投资",
      unsuitFor: "取现",
      liked: "50",
      isLiked: "true",
      isCollected: "true",
      commented: "100",
      ready4Sell: [
        "安E",
        "财富计划"     ],
      detail: {
        "intro": "世人投资，第一要有度，第二要有心，第三要有恒。有度，方能知进退；有心，能辨利与害；有恒，则积长久之财。\n\n\n 陆金所：投资谏言",
        "hyperLink": "http://"
      }
    }
  },
  onLoad: function() {
<<<<<<< HEAD
    // this.dataLoad(new Date());
    user.load();
    console.log(user.hasUserInfo)
    console.log(user.canIUse)
    console.log(user.info.nickName)
    if (this.data.dateList === null || this.data.dateList ===undefined)    {
      this.dateSetting(new Date());
=======
    user.load(this.viewComments, true);
    if (currentDate === null || currentDate === undefined) {
      currentDate = new Date();
>>>>>>> hook the api for coments
    }
    this.dataLoad(new Date());
    this.setData({
      user: user,
    })
  },
  getUserInfo: user.getUserInfo,
  viewComments: function() {
    wx.navigateTo({
      url: '../comments/index?a=1',
    })
  },
<<<<<<< HEAD
  viewForecast: function () {
    wx.navigateTo({
      url: '../forecastProd/index',
    })
  },
  viewMyFavorite: function () {
    wx.navigateTo({
      url: '../favorite/index',
    })
  },
  dataLoad: function(currentDate){
    var that = this;
    this.setData({
      dateArray: util.formatDate2Array(currentDate)
    })
      // post('https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate', {
    post('https://dsn.apizza.net/mock/21031c3f5ec7087ab6306752ca3bee11/home/getInvestmentInfoByDate', {
        date: currentDate,
        userId: 'chenyan789'
      }).then(
        function(data){
          // console.log(data.data.data);
          console.log(data);
          // calendarData = data.data.data;
          that.setData({
            calendarData: data.data.data,
          })
        }
        );
  },
  dateSetting: function(curDate){
    var dates = [];
    var j=0;
    for (var i = -7; i < 8; i++) {
      dates[j] = util.relativeDate(curDate, i);
      j++;
=======
  //滑动移动事件
  handletouchmove: function(event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0) {
        text = "向左滑动"
        daysJia(currentDate);
      } else if (tx > 0) {
        text = "向右滑动"
        daysJian(currentDate);
      }
    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动"
      else if (ty > 0)
        text = "向下滑动"
>>>>>>> hook the api for coments
    }
    this.setData({
<<<<<<< HEAD
      dateList: dates
    })
  },
  change: function(data){
    this.dataLoad(this.data.dateList[data.detail.current]);
  },
  doLike: function(){
    var that = this;
    post('https://dsn.apizza.net/mock/21031c3f5ec7087ab6306752ca3bee11/interaction/iLike', {
      calendarId: this.data.calendarData.calendarId,
      userId: 'chenyan789',
      isLiked: !this.data.calendarData.isLiked
    }).then(
      function (data) {
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
=======
      text: text,
      monthText: formatMonth(currentDate),
      dayText: formatDay(currentDate),
    });
  },

  //滑动开始事件
  handletouchtart: function(event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  //滑动结束事件
  handletouchend: function(event) {
    this.data.currentGesture = 0;
    this.setData({
      text: "没有滑动",
    });
>>>>>>> hook the api for coments
  },
  doCollection: function(){
    var that = this;
    post('https://dsn.apizza.net/mock/21031c3f5ec7087ab6306752ca3bee11/interaction/add2collection', {
      calendarId: this.data.calendarData.calendarId,
      userId: 'chenyan789',
      isCollect: !this.data.calendarData.isCollected
    }).then(
      function (data) {
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