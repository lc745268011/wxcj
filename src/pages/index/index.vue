<template>
  <div>
    <div class="i-title clearfix p30">
      <span class="fl">福利</span>
      <span class="fr i-gohome"><navigator url="../counter/main" hover-class="navigator-hover">我要上首页</navigator></span>
      <!-- <span class="fr" @click="jump">跳转</span> -->
    </div>
    <ul class="welfare">
      <li v-for="(item,index) in welfare" :key="index">
        <div class="welfare-pic" :style="{'backgroundImage':'url('+item.pic+')'}"></div>
        <div class="welfare-info">
          <div class="">{{item.sponsor}} 赞助</div>
          <div v-for="(m,i) in item.prize" :key="i">
            <div class="" v-if="item.prize.length==1">奖品：{{m.name}} X{{m.num}}</div>
            <div class="" v-if="item.prize.length>1">奖品{{i+1}}：{{m.name}} X{{m.num}}</div>
          </div>
          <div class="">{{item.endtime}} 自动开奖</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      welfare: [
        {
          pic: require('../../../static/images/pic.jpg'),
          sponsor: '京东',
          prize: [
            {
              name: '小米9',
              num: 1
            }
          ],
          endtime: '2019-07-08 15:00'
        },
        {
          pic: require('../../../static/images/pic.jpg'),
          sponsor: '京东',
          prize: [
            {
              name: '小米9',
              num: 1
            },
            {
              name: '小米8',
              num: 2
            }
          ],
          endtime: '2019-07-08 15:00'
        }
      ]
    }
  },

  components: {
  },

  methods: {
    // jump () {
    //   wx.switchTab({
    //     url: '../mine/main'
    //   })
    // }
  },

  created () {
  }
}
</script>

<style scoped lang="scss">
.i-title{
  padding: 10px 15px;
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
    .welfare-pic{
      height: 150px;
      width: 100%;
      margin: 0 auto;
      background-position: center;
      background-size: auto 100%;
      background-repeat: no-repeat;
    }
    .welfare-info{

    }
  }
}
</style>
