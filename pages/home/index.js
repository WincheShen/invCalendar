'use strict';
//js

Object.defineProperty(exports, "__esModule", {
  value: true
});

const {
  user,
  post
} = require('../../utils/index.js')

var util = require('../../utils/utils.js');

var currentDate = null;

var solarPeriodText = '禾乃登';
var lunarDateText = '瓜时 七月廿二';
var suitForText = "买菜";
var unsuitForText = "理财";

wx.request({
  url: 'https://contest.lujs.cn/bs-opcam/home/getInvestmentInfoByDate',
  data: { 'date': '20180907', 'userId': 'chenyan821' },
  header: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  method:'POST',
  success: function (res) {
    console.log(res.data);
  }
});

exports.default = Page({
  data: {
    monthText: util.formatMonth(currentDate),
    dayText: util.formatDay(currentDate),
    solarPeriod: solarPeriodText,
    lunarDate: lunarDateText,
    suitFor: suitForText,
    unsuitFor: unsuitForText,
    lastX: 0,     //滑动开始x轴位置
    lastY: 0,     //滑动开始y轴位置
    text: "没有滑动",
    currentGesture: 0, //标识手势
  },
  onLoad: function() {
    user.load();
    if(currentDate===null||currentDate===undefined){
      currentDate = new Date();
    }
  },
  getUserInfo: user.getUserInfo,
  viewComments: function() {
    wx.navigateTo({
      url: '../comments/index',
    })
    // post('https://contest.lujs.cn/bs-opcam/home/getCommentsByCode', {
    //   calendarId: '20180907',
    //   pageSize: 10,
    //   currentPage: 1
    // }).then(r => console.log(r))
  }
  ,
  //滑动移动事件
  handletouchmove: function (event) {
    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var tx = currentX - this.data.lastX
    var ty = currentY - this.data.lastY
    var text = ""
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0){
        text = "向左滑动"
        util.daysJia(currentDate);
      }
      else if (tx > 0){
        text = "向右滑动"
        util.daysJian(currentDate);
      }
    }
    //上下方向滑动
    else {
      if (ty < 0)
        text = "向上滑动"
      else if (ty > 0)
        text = "向下滑动"
    }

    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY
    this.setData({
      text: text,
      monthText: util.formatMonth(currentDate),
      dayText: util.formatDay(currentDate),
    });
  },

  //滑动开始事件
  handletouchtart: function (event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  //滑动结束事件
  handletouchend: function (event) {
    this.data.currentGesture = 0;
    this.setData({
      text: "没有滑动",
    });
  },
});