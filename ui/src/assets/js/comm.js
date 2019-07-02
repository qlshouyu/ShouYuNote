import util from './FkVueUtil'
import axios from 'axios'
axios.defaults.withCredentials = true
// 这里是重点
const SkynetVuePlugin = {
  install: function (Vue) {
    axios.defaults.withCredentials = true
    Vue.prototype.$axios = axios
    Vue.prototype.$util = util
    // 4. 添加实例方法
    Vue.prototype.$showConfirm = function (option) {
      var that = this
      that.$confirm(option.content ? option.content : '提示内容', option.title ? option.title : '确定？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        option.success ? option.success() : that.$log('请检查是否确实success参数')
      }).catch(() => {
        option.cancel ? option.cancel() : that.$log('请检查是否确实cancel参数')
      })
    }
    Vue.prototype.$log = function (msg) {
      if (this.$config.isDebug) {
        console.log(msg)
      }
    }
    // 打开对话框
    // 参数案例：{title: '测试', component: Detail, params: row}
    Vue.prototype.$showDialog = function (option) {
      if (!option) {
        option = {}
      }
      option.show = true
      var d = this.$root.$children[0].$refs['dialogGlob']
      var vueDialog
      d.open = function (e) {
        if (option.component) {
          var DialogVue = Vue.extend(option.component)
          vueDialog = new DialogVue()
          // 参数合并
          if (option.params) {
            vueDialog.params = option.params
          }
          // 或者，在文档之外渲染并且随后挂载
          vueDialog.$mount()
          var domBox = document.getElementById('divBox')
          domBox.appendChild(vueDialog.$el)
          if (vueDialog.opend) {
            vueDialog.opend()
          }
        }
      }
      d.close = function (e) {
        vueDialog.$destroy()
        var domBox = document.getElementById('divBox')
        domBox.innerHTML = ''
      }
      this.$root.$children[0].$data.dialogOption = option
    }
    Vue.prototype.$closeDialog = function () {
      this.$root.$children[0].$data.dialogOption.show = false
    }
    Vue.prototype.$toast = function (msg, type) {
      var that = this
      if (type) {
        if (type === 'error') {
          that.$message.error(msg)
        }
        if (type === 'success') {
          that.$message({
            message: msg,
            type: 'success'
          })
        }
        if (type === 'warning') {
          that.$message({
            message: msg,
            type: 'warning'
          })
        }
      } else {
        that.$message({
          message: msg,
          type: 'success'
        })
      }
    }
    Vue.prototype.$error = function (msg) {
      this.$toast(msg, 'error')
    }
    Vue.prototype.$success = function (msg) {
      this.$toast(msg, 'success')
    }
    /**
     * get获取
     * @param option
     * {
     *  url:请求地址,
     *  data:参数,
     *  success:成功回调,
     *  error:错误回调
     * }
     */
    Vue.prototype.$get = function (option) {
      let that = this
      let auth = util.cookie.getCookie(that.$config.tokenKey)
      let config = {}
      if (option.params) {
        config = {params: option.params}
      }
      if (auth && auth.length > 0) {
        config = Object.assign(config, {headers: {'Authorization': auth}})
      }
      config = Object.assign(config, {headers: {'x-requested-with': 'XMLHttpRequest'}})
      // debugger
      that.$showLoading()
      option.url = that.$config.baseHost + option.url
      // var ticket = util.getUrlParam('ticket')
      // if (!ticket) {
      //   var userInfo = util.sessionStorage.getItem('userInfo')
      //   if (userInfo) {
      //     ticket = userInfo.casTicket
      //   }
      // }
      // var userInfo = util.sessionStorage.getItem('userInfo')
      // if (userInfo) {
      //   ticket = userInfo.casTicket
      // }
      // if (ticket) {
      //   Object.assign(config.params, {ticket: ticket})
      // }
      // console.info('ticket：', config)
      that.$axios.get(option.url, config)
        .then(function (response) {
          console.log(response)
          if (response.data) {
            if (response.data.flag) {
              if (response.data.flag === true) {
                if (response.data.ret === 302) {
                  location.href = response.data.redirectUrl
                } else if (response.data.ret === 200) {
                  option.success ? option.success(response.data) : that.$success(response.data)
                } else {
                  that.$toast('请求出错', 'error')
                }
              } else {
                that.$toast('未知的服务器错误', 'error')
              }
            }
            if (response.data.code === 200) {
              option.success ? option.success(response.data.data) : that.$success(response.data.data)
            } else if (response.data.code === 401) {
              location.href = '/login'
            } else {
              that.$toast(response.data.data, 'error')
            }
          } else {
            that.$error('未知错误')
          }
          that.$closeLoading()
        })
        .catch(function (error) {
          that.$closeLoading()
          that.$error('网络错误')
          console.log(error)
        })
    }

    /**
     * delete
     * @param option
     * {
     *  url:请求地址,
     *  data:参数,
     *  success:成功回调,
     *  error:错误回调
     * }
     */
    Vue.prototype.$delete = function (option) {
      var that = this
      var auth = util.cookie.getCookie(that.$config.tokenKey)
      var config = {}
      if (option.params) {
        config = {params: option.params}
      }
      if (option.data) {
        config = {data: option.data}
      }
      if (auth && auth.length > 0) {
        config = Object.assign(config, {headers: {'Authorization': auth}})
      }
      config = Object.assign(config, {headers: {'x-requested-with': 'XMLHttpRequest'}})
      that.$showLoading()
      option.url = that.$config.baseHost + option.url
      that.$axios.delete(option.url, config)
        .then(function (response) {
          console.log(response)
          if (response.data) {
            if (response.data.flag) {
              if (response.data.flag === true) {
                if (response.data.ret === 302) {
                  top.location.href = response.data.redirectUrl
                } else if (response.data.ret === 200) {
                  option.success ? option.success(response.data) : that.$success(response.data)
                } else {
                  that.$toast('请求出错', 'error')
                }
              } else {
                that.$toast('未知的服务器错误', 'error')
              }
            }
            if (response.data.code === 200) {
              option.success ? option.success(response.data.data) : that.$success(response.data.data)
            } else if (response.data.code === 401) {
              location.href = '/login'
            } else {
              that.$toast(response.data.data, 'error')
            }
          } else {
            that.$error('未知错误')
          }
          that.$closeLoading()
        })
        .catch(function (error) {
          that.$closeLoading()
          that.$error('网络错误')
          console.log(error)
        })
    }
    /**
     * post 提交
     * @param option
     */
    Vue.prototype.$post = function (option) {
      let that = this
      let auth = util.cookie.getCookie(that.$config.tokenKey)
      let config = {}
      if (option.parm) {
        config = {params: option.parm}
      }
      if (auth && auth.length > 0) {
        config = Object.assign(config, {headers: {'Authorization': auth}})
      }
      config = Object.assign(config, {headers: {'x-requested-with': 'XMLHttpRequest'}})
      that.$showLoading()
      option.url = that.$config.baseHost + option.url

      // var ticket = util.getUrlParam('ticket')
      // if (ticket) {
      //   option.url += '?ticket=' + ticket
      // } else {
      //   var userInfo = util.sessionStorage.getItem('userInfo')
      //   if (userInfo) {
      //     ticket = userInfo.casTicket
      //     if (ticket) {
      //       option.url += '?ticket=' + ticket
      //     }
      //   }
      // }
      // 发送 POST 请求
      that.$axios.post(option.url, option.data, config)
        .then(function (response) {
          console.log(response)
          if (response.data) {
            if (response.data.flag) {
              if (response.data.flag === true) {
                if (response.data.ret === 302) {
                  top.location.href = response.data.redirectUrl
                } else if (response.data.ret === 200) {
                  option.success ? option.success(response.data) : that.$success(response.data)
                } else {
                  that.$toast('请求出错', 'error')
                }
              } else {
                that.$toast('未知的服务器错误', 'error')
              }
            }
            if (response.data.code === 200) {
              option.success ? option.success(response.data.data) : that.$success(response.data.data)
            } else if (response.data.code === 401) {
              location.href = '/login'
            } else {
              that.$toast(response.data.data, 'error')
            }
          } else {
            that.$toast('未知错误', 'error')
          }
          that.$closeLoading()
        })
        .catch(function (error) {
          that.$toast('网络错误', 'error')
          console.log(error)
          that.$closeLoading()
        })
    }
    /**
     * put 提交
     * @param option
     */
    Vue.prototype.$put = function (option) {
      let that = this
      let auth = util.cookie.getCookie(that.$config.tokenKey)
      let config = {}
      if (option.parm) {
        config = {params: option.parm}
      }
      if (auth && auth.length > 0) {
        config = Object.assign(config, {headers: {'Authorization': auth}})
      }
      config = Object.assign(config, {headers: {'x-requested-with': 'XMLHttpRequest'}})
      that.$showLoading()
      option.url = that.$config.baseHost + option.url
      // that.$axios.defaults.withCredentials = true
      // 发送 POST 请求
      that.$axios.put(option.url, option.data, config)
        .then(function (response) {
          console.log(response)
          if (response.data.flag) {
            if (response.data.flag === true) {
              if (response.data.ret === 302) {
                top.location.href = response.data.redirectUrl
              } else if (response.data.ret === 200) {
                option.success ? option.success(response.data) : that.$success(response.data)
              } else {
                that.$toast('请求出错', 'error')
              }
            } else {
              that.$toast('未知的服务器错误', 'error')
            }
          }
          if (response.data) {
            if (response.data.state.code === 200) {
              option.success ? option.success(response.data.data) : that.$success(response.data.data)
            } else if (response.data.state.code === 401) {
              that.$router.push({path: '/login'})
            } else {
              that.$toast(response.data.data, 'error')
            }
          } else {
            that.$toast('未知错误', 'error')
          }
          that.$closeLoading()
        })
        .catch(function (error) {
          that.$toast('网络错误', 'error')
          console.log(error)
          that.$closeLoading()
        })
    }

    // 显示进度条
    Vue.prototype.$showLoading = function () {
      var that = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      that.loading = loading
    }
    //  关闭经度条
    Vue.prototype.$closeLoading = function () {
      var that = this
      if (that.loading) {
        that.loading.close()
      }
    }

    // 表单提交
    Vue.prototype.$submit = function (option) {
      let that = this
      let form = option.form ? option.form : 'form'
      that.$refs[form].validate((valid) => {
        if (valid) {
          that.$post({
            url: option.url,
            data: option.data,
            success: function (data) {
              option.success ? option.success(data) : (data ? that.$success(data) : that.$success('提交成功'))
            }
          })
        }
        return false
      })
    }
  }
}
export default SkynetVuePlugin
