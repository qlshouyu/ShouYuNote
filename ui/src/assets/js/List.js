import Vue from 'vue'
/**
 * 列表操作
 * @author 高露
 */
function List () {
}
List.prototype.init = function (option) {
  let that = this
  that.url = option.url
  that.vue = option.vue
  that.option = option
  var listId = option.list ? option.list : 'list'
  var listPaginationId = option.pageElement ? option.pageElement : 'listPagination'
  var btnSearchId = option.btnSearchId ? option.btnSearchId : 'btnSearch'
  var btnResetId = option.btnResetId ? option.btnResetId : 'btnRest'
  that.params = option.params
  Vue.nextTick(function () {
    that.list = that.vue.$refs[listId]
    that.pageElement = that.vue.$refs[listPaginationId]
    if (that.pageElement) {
      that.pageElement.$on('current-change', function (pageNumber) {
        that.params.pageNumber = pageNumber
        that.refresh(that.params)
      })
    }
    that.searchBtn = that.vue.$refs[btnSearchId]
    if (that.searchBtn) {
      that.searchBtn.$on('click', function (msg) {
        that.refresh()
      })
    }
    that.btnRest = that.vue.$refs[btnResetId]
    if (that.btnRest) {
      that.btnRest.$on('click', function (msg) {
        for (let key in that.params) {
          that.params[key] = ''
        }
        that.refresh(that.params)
      })
    }
  })
  that.refresh()
}

List.prototype.refresh = function (params) {
  let that = this
  that.params = params !== undefined ? params : that.params
  if (!that.params) {
    that.params = {}
  }
  if (!params || !params.pageNumber) {
    var page = that.option.page ? that.option.page : {pageNumber: 1, pageSize: 12}
    that.params = Object.assign(that.params, page)
  }
  that.vue.$get({
    url: that.url,
    params: that.params,
    success: function (data) {
      if (data.totalElements && data.content) {
        that.vue.tableData = data.content
        that.vue.page.total = data.totalElements
      } else {
        that.vue.tableData = data
      }
    }
  })
}
var vueList = new List()
const vueListPlugin = {
  install: function (Vue) {
    Vue.prototype.$list = vueList
  }
}

export default vueListPlugin
