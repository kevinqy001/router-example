<template>
  <div class="main">
    <div class="login-wrap">
      <span class="loginTip" v-show="loginStatus">*请先进行用户登录</span>
      <div class="user-login" v-if="methodTab">
        <transition name="fade">
          <div class="user-normal-wrap" v-if="showUser">
            <input class="user-normal"
                   type="text"
                   name="user"
                   ref="userInput"
                   placeholder="请输入用户名"
                   @focus="showUser = !showUser, userStatus = !userStatus"
                   :value="insUser">
            <span v-if="submitted && insUser !== trueUser">*请输入正确的用户名</span>
          </div>
        </transition>

        <transition name="fade">
          <div class="user-insert-wrap"
               v-if="!showUser"
               :class="{insUserWarn: insUser && insUser !== trueUser, insUserTrue: insUser === trueUser }">
            <h6>请输入用户名</h6>
            <input class="user-insert"
                   ref="userInput"
                   @blur="showUser = !showUser, userStatus = !userStatus"
                   v-focus="userStatus"
                   v-model="insUser">
          </div>
        </transition>
        <transition name="fade">
          <div class="pwd-normal-wrap" v-if="showPwd">
            <input class="pwd-normal"
                   type="password"
                   name="password"
                   ref="pwdInput"
                   placeholder="请输入密码"
                   @focus="showPwd = !showPwd, pwdStatus = !pwdStatus"
                   :value="insPwd">
            <span v-if="submitted && insPwd !== truePwd">*请输入正确的密码</span>
          </div>
        </transition>
        <transition name="fade">
          <div class="pwd-insert-wrap" v-if="!showPwd"
               :class="{insPwdWarn: insPwd && insPwd !== truePwd, insPwdTrue: insPwd === truePwd }">
            <h6>请输入密码</h6>
            <input class="pwd-insert"
                   v-model="insPwd"
                   ref="pwdInput"
                   @blur="showPwd = !showPwd, pwdStatus = !pwdStatus"
                   v-focus="pwdStatus">
          </div>
        </transition>
        <div class="button-wrap">
          <button class="submit" @click="sendLogin" type="submit">登&nbsp录</button>
          <button class="clearIn" @click="resetIns">重&nbsp置</button>
        </div>
      </div>
      <div class="pki-login-wrap" v-if="!methodTab">
        <div class="pki-login">PKI登录</div>
        <div class="help-wrap">
          <a href="#">帮助</a>
          <span>|</span>
          <a href="#">Chrome下载</a>
        </div>
      </div>
      <div class="method-sel" @click="showList = !showList">更换登录方式</div>
      <transition name="custom-classes-transition"
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut">
        <ul class="method-sel-list" v-if="showList">
          <li :class="{selected: methodTab}" @click="tabUser">用户名登录</li>
          <li :class="{selected: !methodTab}" @click="tabPki">PKI登录</li>
        </ul>
      </transition>
    </div>
  </div>

</template>

<script>
  export default{
    data () {
      return {
        showUser: true,
        showPwd: true,
        userStatus: false,
        pwdStatus: false,
        trueUser: 'test',
        insUser: '',
        truePwd: 'test',
        insPwd: '',
        submitted: false,
        showList: false,
        methodTab: true,
        clickedItem: ''
      }
    },
    computed: {
      loginStatus () {
        return this.$store.state.isLogin
      }
    },
    methods: {
      tabUser () {
        this.methodTab = true
        this.showList = false
      },
      tabPki () {
        this.methodTab = false
        this.showList = false
      },
      resetIns () {
        this.insUser = ''
        this.insPwd = ''
      },
      sendLogin () {
        this.$local.save('qiaoyi', {
          login: true,
          userName: this.insUser,
          userPwd: this.insPwd
        })
        this.$router.push('/home')
      }
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    }
  }
</script>

