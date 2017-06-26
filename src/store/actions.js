export default {
  showTip ({commit, state}, method) {
    commit('changeStatus', { method })
  }
}
