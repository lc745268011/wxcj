<template>
  <div>

    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-if="userstatus">123</button>
    <div class="i-title clearfix p30">
      <span class="fl">福利</span>
      <span class="fr i-gohome"><navigator url="../counter/main" hover-class="navigator-hover">我要上首页</navigator></span>
    </div>
    <ul class="welfare">
      <li v-for="(item,index) in welfare" :key="index" @click="goRoute(item.id)">
        <swiper :indicator-dots="true" indicator-color='#d8d8d8' indicator-active-color = '#ffad36' :interval="3000" :duration="500">
          <div v-for="(n,i) in item.list">
            <swiper-item>
              <image :src="n.pfile" class="slide-image welfare-pic"/>
            </swiper-item>
          </div>
        </swiper>
        <div class="welfare-info">
          <div class="" v-if="item.userinfo">{{item.userinfo.nickName}} 赞助</div>
          <div v-for="(m,i) in item.list" :key="i">
            <div class="" v-if="item.list.length==1">奖品：{{m.pname}} X{{m.pnum}}</div>
            <div class="" v-if="item.list.length>1">奖品{{i+1}}：{{m.pname}} X{{m.pnum}}</div>
          </div>
          <div class="" v-if="item.lotteryType==0">{{item.lotteryTime}} 自动开奖</div>
          <div class="" v-if="item.lotteryType==1">{{item.lotteryNumber}} 自动开奖</div>
        </div>
      </li>
    </ul>
    <card1 :selectNavIndex="0"></card1>
  </div>
</template>

<script>
import card1 from '@/components/card1'
export default {
  data () {
    return {
      welfare: [],
      userstatus: false
    }
  },

  components: {
    card1
  },
  onShow: function () {
    var that = this
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userInfo']) {
          that.userstatus = true
        } else {
          that.userstatus = false
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      },
      fail () {
        that.userstatus = false
      }
    })
    that.getlist()
  },
  mounted () {
    this.getlist()
  },
  methods: {
    getlist () {
      var that = this
      wx.request({
        url: that.baseApi + '/portal/Index/plist',
        method: 'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        data: {
        },
        success (res) {
          if (res.data.code > 0) {
            console.log(99999, res.data.data)
            that.welfare = res.data.data
          }
        }
      })
    },
    goRoute (id) {
      console.log('/pages/cjDetail/main?id=' + id)
      wx.navigateTo({
        url: '/pages/cjDetail/main?id=' + id
      })
    },
    bindGetUserInfo (e) {
      var that = this
      wx.checkSession({
        success () {
          // session_key 未过期，并且在本生命周期一直有效
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success (res) {
              if (res.code) {
                // 发起网络请求
                wx.request({
                  url: that.baseApi + '/portal/Index/getuserinfo',
                  method: 'POST',
                  header: {'content-type': 'application/x-www-form-urlencoded'},
                  data: {
                    code: res.code,
                    userinfo: JSON.stringify(e.mp.detail.userInfo)
                  },
                  success (res) {
                    if (res.data.code > 0) {
                      wx.setStorage({
                        key: 'userInfo',
                        data: res.data.data
                      })
                      that.userstatus = false
                    }
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      })
    }
  },

  created () {
  }
}
</script>

<style scoped lang="scss">
.i-title{
  padding: 10px 15px 0 15px;
  .fl{
    font-size: 20px;
    color: #ff0000;
    font-weight:bold;
    font-family:'宋体';
  }
  .i-gohome{
    font-size: 12px;
  }
}
.welfare{
  width: 100%;
  padding: 10px 15px;
  li{
    background: #fff;
    border:1px solid #dcdcdc;
    margin-bottom: 10px;
    .welfare-pic{
      height: 150px;
      width: 100%;
      margin: 0 auto;
      background-position: center;
      background-size: auto 100%;
      background-repeat: no-repeat;
    }
    .welfare-info{
      padding: 5px 10px;
    }
  }
}
</style>
