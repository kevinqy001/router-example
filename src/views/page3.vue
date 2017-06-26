<template>
  <div class="mainWrap">
    <div class="searchWrap-page3">
      <table>
        <tbody>
        <tr>
          <td>发件人姓名</td>
          <td><input></td>
          <td>发件人邮箱</td>
          <td><input></td>
          <td>收件人姓名</td>
          <td><input></td>
          <td>收件人邮箱</td>
          <td><input></td>
        </tr>
        <tr>
          <td>主题包含</td>
          <td><input></td>
          <td>内容包含</td>
          <td><input></td>
          <td>发送时间</td>
          <td colspan="3">
            <el-date-picker
              v-model="form.sendtime"
              type="datetimerange"
              :picker-options="pickerOptions"
              placeholder="选择时间范围"
              size="large"
              align="right">
            </el-date-picker>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="buttonWrap">
        <button>搜索</button>
        <button>清空</button>
      </div>
    </div>
    <div class="mailContent">
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
        form: {
          fromname: '',
          frome: '',
          toname: '',
          to: '',
          sendtime: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        currentPage: 1,
        emailList: []
      }
    },
    computed: {
      filteredEmailList () {
        return this.emailList.slice((this.currentPage - 1) * 10, ((this.currentPage - 1) * 10) + 9)
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.currentPage = val
      }
    },
    created () {
      this.$http.get('../../static/data1.json', {params: {id: this.$route.params.id}}).then((res) => {
        this.emailList = res.body.result.emailList
        this.emailList.slice(0, 9)
      }, (res) => {
        console.log(`Error Status: ${res.status}`)
      })
    }
  }

</script>
