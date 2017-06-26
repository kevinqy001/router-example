
import Vue from 'vue'
import 'animate.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import '@/assets/css/app.css'
import Utils from './libs/utils'
Vue.use(Utils)
import store from './store'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  template: '<App/>',
  components: {App}
})
