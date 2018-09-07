'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var initData = '禾乃登\n瓜时 七月廿二';
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },

    text: initData
  },
  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  methods: {
    onClick: function onClick(event) {
      console.log(event);
    },

    add: function add(e) {
      extraLine.push('other line');
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      });
    },
    remove: function remove(e) {
      if (extraLine.length > 0) {
        extraLine.pop();
        this.setData({
          text: initData + '\n' + extraLine.join('\n')
        });
      }
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJpbml0RGF0YSIsImRhdGEiLCJ0ZXh0IiwibWV0aG9kcyIsIm9uQ2xpY2siLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJhZGQiLCJlIiwiZXh0cmFMaW5lIiwicHVzaCIsInNldERhdGEiLCJqb2luIiwicmVtb3ZlIiwibGVuZ3RoIiwicG9wIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUlBLFdBQVcsY0FBZjs7QUFRRUMsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSEMsVUFBTUY7QUFESCxHO0FBR047QUFDQUcsV0FBUztBQUNQQyxXQURPLG1CQUNDQyxLQURELEVBQ1E7QUFDYkMsY0FBUUMsR0FBUixDQUFZRixLQUFaO0FBQ0QsS0FITTs7QUFJTEcsU0FBSyxhQUFTQyxDQUFULEVBQVk7QUFDbkJDLGdCQUFVQyxJQUFWLENBQWUsWUFBZjtBQUNBLFdBQUtDLE9BQUwsQ0FBYTtBQUNYVixjQUFNRixXQUFXLElBQVgsR0FBa0JVLFVBQVVHLElBQVYsQ0FBZSxJQUFmO0FBRGIsT0FBYjtBQUdELEtBVFE7QUFVVEMsWUFBUSxnQkFBU0wsQ0FBVCxFQUFZO0FBQ2xCLFVBQUlDLFVBQVVLLE1BQVYsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJMLGtCQUFVTSxHQUFWO0FBQ0EsYUFBS0osT0FBTCxDQUFhO0FBQ1hWLGdCQUFNRixXQUFXLElBQVgsR0FBa0JVLFVBQVVHLElBQVYsQ0FBZSxJQUFmO0FBRGIsU0FBYjtBQUdEO0FBQ0Y7QUFqQlEiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGluaXREYXRhID0gJ+emvuS5g+eZu1xcbueTnOaXtiDkuIPmnIjlu7/kuownXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1wYW5lbCc6ICdAbWludWkvd3hjLXBhbmVsJyxcbiAgICAgICd3eGMtY2MnOiAnQG1pbnVpL3d4Yy1jYydcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHsgXG4gICAgIHRleHQ6IGluaXREYXRhXG4gIH0sXG4gIC8qKiBub3RlOiDlnKggd3hwIOaWh+S7tuaIluiAhemhtemdouaWh+S7tuS4reivt+WOu+aOiSBtZXRob2RzIOWMheijhSAqL1xuICBtZXRob2RzOiB7XG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgY29uc29sZS5sb2coZXZlbnQpXG4gICAgfSxcbiAgICAgIGFkZDogZnVuY3Rpb24oZSkge1xuICAgIGV4dHJhTGluZS5wdXNoKCdvdGhlciBsaW5lJylcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdGV4dDogaW5pdERhdGEgKyAnXFxuJyArIGV4dHJhTGluZS5qb2luKCdcXG4nKVxuICAgIH0pXG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24oZSkge1xuICAgIGlmIChleHRyYUxpbmUubGVuZ3RoID4gMCkge1xuICAgICAgZXh0cmFMaW5lLnBvcCgpXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICB0ZXh0OiBpbml0RGF0YSArICdcXG4nICsgZXh0cmFMaW5lLmpvaW4oJ1xcbicpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICB9XG59Il19