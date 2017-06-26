import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Login from '@/components/login'
import Home from '@/components/home'
import page1 from '@/views/page1'
import page2 from '@/views/page2'
import page3 from '@/views/page3'
import store from '@/store'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        login: false
      }
    },
    {
      path: '/home',
      component: Home,
      meta: {
        login: true
      },
      children: [
        {
          path: '',
          name: 'page1',
          component: page1,
          meta: {
            login: true
          }
        },
        {
          path: 'page2',
          name: 'page2',
          component: page2
        },
        {
          path: 'page3',
          name: 'page3',
          component: page3
        }
      ]
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.login) {
    let info = router.app.$local.fetch('qiaoyi')
    if (info.login) {
      store.dispatch('showTip', false)
      next()
    } else {
      store.dispatch('showTip', true)
      router.push('/')
    }
  } else {
    next()
  }
})

export default router
