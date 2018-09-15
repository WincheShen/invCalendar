function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var monthStr, dayStr;
  
  if (month < 10)
    monthStr = "0" + month;
  else 
    monthStr = month;

  if (day < 10)
    dayStr = "0" + day;
  else
    dayStr = day;

  return year + "-" + monthStr + "-" + dayStr;
}

function relativeDate(curDate, days) {
  var preDay_milliseconds = curDate.getTime() + days * 1000 * 60 * 60 * 24;

  var preday = new Date();
  preday.setTime(preDay_milliseconds);
  return preday;
}


function formatDate2Array(date) {
  var dateArray = [];

  dateArray[0] = date.getFullYear()
  dateArray[1] = date.getMonth() + 1
  dateArray[2] = date.getDate()
  return dateArray;
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


module.exports = {
  formatDate: formatDate,
  relativeDate: relativeDate,
  formatDate2Array: formatDate2Array
}