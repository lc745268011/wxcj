<template>
  <div>
    <swiper :indicator-dots="true" indicator-color='#d8d8d8' indicator-active-color = '#ffad36' :autoplay="true" :interval="3000" :duration="500">
      <div v-for="(n,i) in cjinfo.list">
        <swiper-item>
          <image :src="n.pfile" class="slide-image welfare-pic"/>
        </swiper-item>
      </div>
    </swiper>
    <div class="welfare-info">
      <div v-for="(m,i) in cjinfo.list" :key="i">
        <div class="goodsname" v-if="cjinfo.list.length==1">奖品：{{m.pname}} X{{m.pnum}}</div>
        <div class="goodsname" v-if="cjinfo.list.length>1">奖品{{i+1}}：{{m.pname}} X{{m.pnum}}</div>
      </div>
      <div class="" v-if="cjinfo.lotteryType==0">{{cjinfo.lotteryTime}} 自动开奖</div>
      <div class="" v-if="cjinfo.lotteryType==1">{{cjinfo.lotteryNumber}} 自动开奖</div>
    </div>
    <div class="initiator vCenter">
      <div v-if="cjinfo.userinfo">
        <img :src="cjinfo.userinfo.avatarUrl" alt="">
        {{cjinfo.userinfo.nickName}}
      </div>
      <div>抽奖发起人</div>
    </div>
    <div class="joincjbtn" v-if="joincjbtn==0" @click="joincj">
      <div class="joincj">参与抽奖</div>
      <div class="joincjBox"></div>
    </div>
    <div class="joincjbtn" v-if="joincjbtn==1">
      <div class="joincj">待开奖</div>
      <div class="joincjBox"></div>
    </div>
    <div class="joinuser">
      已有{{alluser.length}}人参与
      <ul class="clearfix">
        <li v-for="(item,index) in alluser" :key="index">
          <img :src="item.userinfo.avatarUrl" alt="">
        </li>
      </ul>
    </div>
    <i-toast id="toast" />
  </div>
</template>

<script>
const { $Toast } = require('../../../static/iview/base/index')

export default {
  data () {
    return {
      cjinfo: {},
      sid: 0,
      userid: 0,
      joincjbtn: 0,
      alluser: []
    }
  },
  onLoad: function (option) {
    var that = this
    that.sid = option.id
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        that.userid = res.data.id
      }
    })
    wx.request({
      url: that.baseApi + '/portal/Index/plistinfo',
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'},
      data: {
        'id': that.sid
      },
      success (res) {
        if (res.data.code > 0) {
          that.cjinfo = res.data.data
        }
      }
    })
    that.alljoinuser()
  },
  methods: {
    alljoinuser () {
      var that = this
      wx.request({
        url: that.baseApi + '/portal/Index/alljoinuser',
        method: 'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        data: {
          sid: that.sid
        },
        success (res) {
          if (res.data.code > 0) {
            that.alluser = [...res.data.data]
            if (that.alluser.length > 0) {
              that.alluser.forEach(m => {
                console.log(m.userid, that.userid)
                if (m.userid === that.userid) {
                  that.joincjbtn = 1
                } else {
                  that.joincjbtn = 0
                }
              })
            } else {
              that.joincjbtn = 0
            }
          }
        }
      })
    },
    joincj () {
      var that = this
      wx.request({
        url: that.baseApi + '/portal/Index/join',
        method: 'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        data: {
          userid: that.userid,
          sid: that.sid
        },
        success (res) {
          if (res.data.code > 0) {
            $Toast({
              content: '参与抽奖成功',
              type: 'success'
            })
          }
        }
      })
    }
  }

}
</script>
<style scoped lang="scss">
.slide-image{
  width: 100%;
  height: 100%;
}
.welfare-info{
  margin: 10px 15px;
  color: 14px;
  color: #999;
  border-bottom: 1px solid #efefef;
  padding-bottom: 10px;
  .goodsname{
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }
}
.initiator{
  margin: 0 15px;
  border-bottom: 1px solid #efefef;
  padding-bottom: 10px;
  justify-content: space-between;
  img{
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
.joinuser{
  margin: 0 15px;
  text-align: center;
  ul{
    margin-top: 10px;
    li{
      display: inline-block;
    }
    img{
      width: 40px;
      height: 40px;
      margin: 0 5px 5px 0;
    }
  }
}
.joincjbtn{
  position: relative;
  height: 160px;
}
.joincj{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 80px;
  height: 80px;
  background: red;
  color: #fff;
  text-align: center;
  line-height: 80px;
  border-radius: 50%;
  z-index: 9;
  margin: auto;
}
.joincjBox{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: red;
  opacity: 0.2;
  margin: auto;
  animation:water 5s infinite;
}
@keyframes water
{
0% {transform: scale(1)}
50% {transform: scale(1.2)}
100% {transform: scale(1)}
}
</style>
