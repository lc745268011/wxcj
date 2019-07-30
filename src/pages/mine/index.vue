<template>
  <div>
    <img :src="userInfo.avatarUrl" alt="">
    <div>{{userInfo.nickName}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: []
    }
  },
  mounted () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        that.userInfo = res.data
        console.log(8888, res.data)
      }
    })
  }
}
</script>
