import config from './config'
function FkVueUtil () {
  this.version = {
    version: 'v1.0.0'
  }
  this.getIds = function (objs) {
    let ids = []
    for (var i = 0; i < objs.length; i++) {
      ids.push(objs[i].id)
    }
    return ids
  }
  this.log = function () {
    if (config.isDebug) {
      if (arguments) {
        for (var i = 0; i < arguments.length; i++) {
          console.log(arguments[i])
        }
      }
    }
  }
  this.getUrlParam = function (paraName) {
    var url = document.location.toString()
    var arrObj = url.split('?')
    if (arrObj.length > 1) {
      var arrPara = arrObj[1].split('&')
      var arr
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split('=')
        if (arr != null && arr[0] === paraName) {
          var p = arr[1]
          if (p.indexOf('#/') > 0) {
            return p.substring(0, p.length - 2)
          }
          return p
        }
      }
      return ''
    } else {
      return ''
    }
  }
  this.ms = 'mystorage'
  this.storage = window.sessionStorage
}
// cookie
FkVueUtil.prototype.cookie = {
  setCookie: function (cname, cvalue, exminute) {
    var d = new Date()
    d.setTime(d.getTime() + (exminute * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    console.info(cname + '=' + cvalue + '; ' + expires)
    document.cookie = cname + '=' + cvalue + '; ' + expires
    console.info(document.cookie)
  },
  refreshCookie: function (exminute) {

  },
  getCookie: function (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
    }
    return ''
  },
  // 清除cookie
  clearCookie: function (name) {
    this.setCookie(name, '', -1)
  }
}
FkVueUtil.prototype.cache = {
  put: function (key, value) {
    localStorage.setItem(key, value)
  },
  get: function (key) {
    return localStorage.getItem(key)
  },
  clear: function () {
    return localStorage.clear()
  },
  putUser: function (user) {
    let userStr = JSON.stringify(user)
    fkVueUtil.log('缓存的用户信息：', userStr)
    this.put(config.userKey, userStr)
  },
  getUser: function () {
    let strUser = this.get(config.userKey)
    if (strUser) {
      fkVueUtil.log('获取到缓存的用户信息：', strUser)
      let user = JSON.parse(strUser)
      return user
    } else {
      return undefined
    }
  }
}

FkVueUtil.prototype.date = {
  // 时间戳格式化函数
  timeToFormat: function (time) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    var date = new Date(time)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h = date.getHours() + ':'
    var m = date.getMinutes() + ':'
    var s = date.getSeconds()
    return Y + M + D + h + m + s
  },
  // 时间戳格式化函数
  dateToFormat: function (date) {
    // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = date.getDate()
    return Y + M + D
  }
}

FkVueUtil.prototype.string = {
  // 时间戳格式化函数
  getStrByJsArray: function (arr) {
    var str = ''
    for (var i = 0; i < arr.length; i++) {
      str += arr[i] + ','
    }
    // 去掉最后一个逗号(如果不需要去掉，就不用写)
    if (str.length > 0) {
      str = str.substr(0, str.length - 1)
    }
    return str
  }
}
FkVueUtil.prototype.sessionStorage = {
  init: function () {
    fkVueUtil.storage.setItem(fkVueUtil.ms, '{"data":{}}')
  },
  setItem: function (key, value) {
    // 存储
    var mydata = fkVueUtil.storage.getItem(fkVueUtil.ms)
    if (!mydata) {
      this.init()
      mydata = fkVueUtil.storage.getItem(fkVueUtil.ms)
    }
    mydata = JSON.parse(mydata)
    mydata.data[key] = value
    fkVueUtil.storage.setItem(fkVueUtil.ms, JSON.stringify(mydata))
    return mydata.data
  },
  getItem: function (key) {
    // 读取
    var mydata = fkVueUtil.storage.getItem(fkVueUtil.ms)
    if (!mydata) {
      return false
    }
    mydata = JSON.parse(mydata)
    return mydata.data[key]
  },
  removeItem: function (key) {
    // 读取
    var mydata = fkVueUtil.storage.getItem(fkVueUtil.ms)
    if (!mydata) {
      return false
    }
    mydata = JSON.parse(mydata)
    delete mydata.data[key]
    fkVueUtil.storage.setItem(fkVueUtil.ms, JSON.stringify(mydata))
    return mydata.data
  },
  clear: function () {
    // 清除对象
    fkVueUtil.storage.removeItem(fkVueUtil.ms)
  }

}

let fkVueUtil = new FkVueUtil()
export default fkVueUtil
