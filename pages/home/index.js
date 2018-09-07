'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var solarPeriodText = '禾乃登';
var lunarDateText = '瓜时 七月廿二';
var suitForText="买菜";
var unsuitForText="理财";
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },
    solarPeriod: solarPeriodText,
    lunarDate: lunarDateText,
    suitFor:suitForText,
    unsuitFor:unsuitForText
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  methods: {
    onClick: function onClick(event) {
      console.log(event);
    },

    add: function add(e) {
      extraLine.push('other line');
      this.setData({
        lunarDate: lunarDateText + '\n' + extraLine.join('\n'),
        solarPeriod: solarPeriodText + '\n' + extraLine.join('\n')
      });
    },
    remove: function remove(e) {
      if (extraLine.length > 0) {
        extraLine.pop();
        this.setData({
          lunarDate: lunarDateText + '\n' + extraLine.join('\n'),
          solarPeriod: solarPeriodText + '\n' + extraLine.join('\n')
        });
      }
    }
  }
});
