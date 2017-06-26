const changeStatus = 'changeStatus'
export default {
  [changeStatus] (state, method) {
    state.isLogin = method
  }
}
