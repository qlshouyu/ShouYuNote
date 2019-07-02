function Config () {
}
Config.prototype = {
  cookieTimeOut: 120000,
  tokenKey: 'skynet_token',
  // baseHost: 'http://192.168.78.71:9310/osr/',
  baseHost: '.',
  baseFileUrl: '/api/osr/v1/file/',
  isDebug: true,
  login_url: '/login',
  task: '/api/osr/v1/task',
  taskSync: '/api/osr/v1/task/sync',
  reportByTime: '/api/osr/v1/report/bytime',
  reportByTimeAndLang: '/api/osr/v1/report/bytimeandlang',
  timex: '/api/osr/v1/report/timex',
  dependencies: '/api/osr/v1/dependencies',
  processUrl: '/api/osr/v1/process/url'
}
var config = new Config()
export default config
