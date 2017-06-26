<template>
  <div>
    <header class="page_header">
      <div class="header_wrap">
        <span class="header_title" @click="backHome"></span>
        <ul class="header_menu">
          <router-link :to="{name:'page1'}" tag="li" exact>首&nbsp&nbsp页
          </router-link>
          <router-link :to="{name:'page2'}" tag="li">虚拟邮箱
          </router-link>
          <router-link :to="{name:'page3'}" tag="li">邮件检索
          </router-link>
        </ul>
        <div class="header_user" @click="listShow = !listShow">
          <div class="user-photo"></div>
          <div class="user-name">测试用户</div>
        </div>
        <ul class="header_user_list" v-show="listShow">
          <li>用户中心</li>
          <li @click="backLogin">登&nbsp出</li>
        </ul>
      </div>
    </header>
    <transition name="slide-fade" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        listShow: false
      }
    },
    methods: {
      backHome () {
        this.$router.push({path: '/home'})
      },
      backLogin () {
        this.$local.save('qiaoyi', null)
        this.$router.push({path: '/'})
      }
    }
  }
</script>

