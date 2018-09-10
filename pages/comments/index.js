const {
  post,
  user,
  apiBase
} = require('../../utils/index.js')
const pageSize = 10

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
          const entries = d.comments.map(({
            author,
            comment
          }, i) => ({
            id: i,
            avatarUrl: user.info.avatarUrl,
            showNickName: author,
            content: comment
          }))
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
    post(`${apiBase}/interaction/userComment`, {
        calendarId: this.data.currentDate,
        comment: this.data.comments,
        userId: 'chenyan789',
        userName: user.info.nickName
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