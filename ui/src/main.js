// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Comm from './assets/js/comm.js'
import Config from './assets/js/config.js'
import List from './assets/js/List.js'
import './assets/fonts/iconfont.js'
import DrapView from './components/comm/DrapView.vue'

import ECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Comm)
Vue.use(List)
Vue.component('yu-drap-view', DrapView)
Vue.prototype.$config = Config
// 注册组件后即可使用
Vue.component('v-chart', ECharts)

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// window.Turing.ready((type, data) => {
//   /* eslint-disable no-new */
//   new Vue({
//     el: '#app',
//     router,
//     components: { App },
//     template: '<App/>'
//   })
// })
