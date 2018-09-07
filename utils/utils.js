function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatMonth(date){
  var month;
  if(date===null||date===undefined){
    month = (new Date()).getMonth() + 1
  }else{
     month = date.getMonth() + 1
  }
  
  return month +'月';
}
function formatDay(date){
  var day;
  if (date === null || date === undefined) {
    day = (new Date()).getDate()
  } else {
    day = date.getDate()
  }
  return day+ '日'; 
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function daysJian(date) {
  date.setDate(date.getDate() - 1);//设置天数 -1 天
}
function daysJia(date) {
  date.setDate(date.getDate() + 1);//设置天数 +1 天
}


module.exports = {
  formatTime: formatTime,
  formatMonth: formatMonth,
  formatDay: formatDay,
  daysJian: daysJian,
  daysJia: daysJia
}
