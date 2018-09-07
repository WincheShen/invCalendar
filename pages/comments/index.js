// components/comment/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    url: String
  },

  /**
   * Component initial data
   */
  data: {
    comment_data: [{
      id: 1,
      userId: 2,
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL7hJNvtbzmDqJIY6N3FVyehTxR30bnsLw332CuSElrmKxl2oDocDwRg1UyaSHf72cLlETR9XwtYg/132',
      showNickName: 'Feng in the rain',
      time: '2天前',
      content: '这是一个测试评论~~'
    }, {
      id: 2,
      userId: 2,
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL7hJNvtbzmDqJIY6N3FVyehTxR30bnsLw332CuSElrmKxl2oDocDwRg1UyaSHf72cLlETR9XwtYg/132',
      showNickName: 'Feng in the rain',
      time: '2天前',
      content: '这是一个测试评论~~'
    }, {
      id: 3,
      userId: 2,
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL7hJNvtbzmDqJIY6N3FVyehTxR30bnsLw332CuSElrmKxl2oDocDwRg1UyaSHf72cLlETR9XwtYg/132',
      showNickName: 'Feng in the rain',
      time: '2天前',
      content: '这是一个测试评论~~'
    }]
  },

  /**
   * Component methods
   */
  methods: {

  }
})
