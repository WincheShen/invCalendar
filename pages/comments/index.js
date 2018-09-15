const {
  post,
  user,
  apiBase
} = require('../../utils/index.js')
const pageSize = 10

const calcIntervalDays = function(lDate, rDate) {
  return parseInt(Math.abs(new Date(lDate) - new Date(rDate)) / 1000 / 60 / 60 / 24)
}

Page({
  data: {
    comment_data: [],
    currentPage: 1,
    appendComments: false,
    isShowPop: false,
    currentDate: ''
  },
  onLoad(options) {
    this.init(options)
    this.loadComments()
  },
  onPullDownRefresh() {
    this.setData({
      currentPage: 1,
      appendComments: false
    })
    wx.nextTick(this.loadComments)
  },
  onReachBottom() {
    this.setData({
      currentPage: this.data.currentPage + 1,
      appendComments: true
    })
    wx.nextTick(this.loadComments)
  },
  init(opts) {
    const {
      y,
      m,
      d
    } = opts
    this.setData({
      omment_data: [],
      currentPage: 1,
      currentDate: `${y}${m}${d}`
    })
  },
  loadComments() {
    post(`${apiBase}/home/getCommentsByCode`, {
      calendarId: this.data.currentDate,
      pageSize: pageSize,
      currentPage: this.data.currentPage
    }).then(({
      success,
      data
    }) => {
      const {
        msg,
        data: d
      } = data
      if (!success) {
        wx.showToast({
          title: msg,
        })
      } else {
        if (d.comments && d.comments.length) {
          const now = new Date,
            entries = d.comments.map(({
              author,
              comment,
              avatarUrl,
              date
            }, i) => {
              var days = calcIntervalDays(date, now)
              return {
                id: i,
                avatarUrl: avatarUrl,
                showNickName: author,
                content: comment,
                time: !days ? date : `${days}天前`
              }
            })
          if (this.data.appendComments) {
            this.setData({
              comment_data: this.data.comment_data.concat(entries)
            })
          } else {
            this.setData({
              comment_data: entries
            })
          }
        }
      }
    }).then(() => wx.stopPullDownRefresh())
  },
  toggleCommentPopup() {
    this.setData({
      isShowPop: !this.data.isShowPop
    })
  },
  inputComents(e) {
    this.setData({
      comments: e.detail.value
    })
  },
  submitComment() {
    if (!this.data.comments || !this.data.comments.length) {
      this.toggleCommentPopup()
      return
    }
    post(`${apiBase}/interaction/userComment`, {
        calendarId: this.data.currentDate,
        comment: this.data.comments,
        userId: user.info.nickName,
        userName: user.info.nickName,
        avatarUrl: user.info.avatarUrl

      }).then(({
        success,
        data
      }) => {
        const {
          msg
        } = data
        if (!success) {
          wx.showToast({
            title: msg,
          })
        }
      }).then(this.toggleCommentPopup)
      .then(this.loadComments)
  }
})