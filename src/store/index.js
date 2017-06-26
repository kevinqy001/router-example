import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'

const state = {
  isLogin: false
}
export default new Vuex.Store({
  state,
  actions,
  mutations
})