const {
  post,
  user
} = require('../../utils/index.js')
const pageSize = 10

Page({
  data: {
    comment_data: [],
    currentPage: 1,
    appendComments: false,
    isShowPop: false
  },
  onLoad() {
    this.init()
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
  init() {
    this.setData({
      omment_data: [],
      currentPage: 1,
    })
  },
  loadComments() {
    post('https://contest.lujs.cn/bs-opcam/home/getCommentsByCode', {
      calendarId: '20180907',
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
  writeComment() {
    this.setData({
      isShowPop: true
    })
  }
})