<template>
  <div class="mainWrap">
    <div class="searchWrap-page2">
      <input :placeholder="placeholder" @focus="clearHolder" @blur="fillHolder">
      <button></button>
    </div>
    <ul class="mailBox">
      <li :class="{selected: item === isClickedItem}" v-for="item in mailBoxList" @click="clickItem(item)"><span>{{item}}</span>
      </li>
    </ul>
    <div class="mailContent-page2">
      <table cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <th>发件人</th>
          <th>收件人</th>
          <th>邮件主题</th>
          <th>发件日期</th>
          <th>发件IP</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in filteredEmailList">
          <td>{{item.From}}</td>
          <td>{{item.To}}</td>
          <td>{{item.Subject}}</td>
          <td>{{item.SendDate}}</td>
          <td>{{item.SendIP}}</td>
        </tr>
        </tbody>
      </table>
      <div class="pageCon">
        <el-pagination :page-size="10"
                       layout="total, prev, pager, next"
                       :total="emailList.length"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  export default{
    data () {
      return {
        mailBoxList: ['收件箱', '发件箱', '草稿箱'],
        isClickedItem: '收件箱',
        placeholder: '请输入邮箱地址',
        currentPage: 1,
        emailList: []
      }
    },
    created () {
      this.$http.get('../../static/data1.json', {params: {id: this.$route.params.id}}).then((res) => {
        this.emailList = res.body.result.emailList
      }, (res) => {
        console.log(`Error Status: ${res.status}`)
      })
    },
    computed: {
      filteredEmailList () {
        return this.emailList.slice((this.currentPage - 1) * 10, ((this.currentPage - 1) * 10) + 9)
      }
    },
    methods: {
      clickItem (item) {
        this.isClickedItem = item
      },
      clearHolder () {
        this.placeholder = ''
      },
      fillHolder () {
        this.placeholder = '请输入邮箱地址'
      },
      handleCurrentChange (val) {
        this.currentPage = val
      }
    }
  }
</script>

