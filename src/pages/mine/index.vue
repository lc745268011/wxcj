<template>
  <div>
    <div class="vCenter userinfo">
      <img :src="userInfo.avatarUrl" alt="" class="avatar">
      <div class="nickName">{{userInfo.nickName}}</div>
    </div>
    <ul class="vCenter luckdraw">
      <li>
        <div>11</div>
        <div>全部抽奖</div>
      </li>
      <li>
        <div>11</div>
        <div>发起抽奖</div>
      </li>
      <li>
        <div>11</div>
        <div>中奖记录</div>
      </li>
    </ul>
    <ul class="tjlist">
      <li>
        官方商城
      </li>
      <li>
        购买高级版
      </li>
      <li>
        分享好友
      </li>
    </ul>
    <ul class="tjlist">
      <li>关于我们</li>
    </ul>
    <card1 :selectNavIndex="2"></card1>
  </div>
</template>
<script>
import card1 from '@/components/card1'
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
  },
  components: {
    card1
  }
}
</script>
<style lang="scss" scoped>
.userinfo{
  padding: 10px 15px;
  border-bottom:1px solid #f9f9f9; 
  background: #fff;
  .avatar{
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 15px;
  }
}
.luckdraw{
  display: flex;
  border-bottom:1px solid #f9f9f9;
  padding: 10px 0;
  background: #fff;
  li{
    flex-grow: 1;
    text-align: center;
    border-right: 1px solid #f9f9f9;
    div:first-child{
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
    div:last-child{
      font-size: 14px;
      color: #999;
      margin-top: 5px;
    }
  }
  li:last-child{
    border-right:0 
  }
}
.tjlist{
  background: #fff;
  margin-top: 10px;
  li{
    padding: 15px 15px;
    border-bottom:1px solid #f9f9f9;
  }
  li:last-child{
    border-bottom: 0;
  }
}
</style>
