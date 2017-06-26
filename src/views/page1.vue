<template>
  <div class="searchWrap-page1">
    <input placeholder="请输入搜索内容,多个关键词请用空格分隔">
    <button @click="toResult">开始搜索</button>
  </div>
</template>

<script>
  export default{
    methods: {
      toResult () {
        this.$router.push({path: '/result'})
      }
    }
  }
</script>

