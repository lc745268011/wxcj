<template>
<div>
  <div class="box"></div>
  <div class="tabbar-wrap" :class="isIphoneX? 'isIphoneX':''">
      <ul class="tabbar">
          <li class="tabbar-item" v-for="(item, index) in navList" 
          :key="index" 
          @click="selectNavItem(index, item.pagePath)"
          :class="item.isSpecial ? 'wrapSpecial':''">
              <p class="tabbar-icon" >
                  <img alt="tabbar-icon" 
                  :src="selectNavIndex == index? item.selectedIconPath : item.iconPath" 
                  :class="item.isSpecial ? 'imgSpecial':''"
                  >
              </p>
              <p class="tabbar-text" :class="selectNavIndex == index? 'active':''">
                  {{item.text}}
              </p>
          </li>
      </ul>
  </div>
</div>
</template>

<script>
  export default {
    props: ['selectNavIndex'],
    data () {
      return {
        color: '#979795',
        selectedColor: '#45b7af',
        navList: [
          {
            'text': '首页',
            'pagePath': '/pages/index/main',
            'iconPath': '/static/tabs/home.png',
            'selectedIconPath': '/static/tabs/home-active.png'
          }, {
            'text': '发起抽奖',
            'pagePath': '/pages/logs/main',
            'iconPath': '/static/tabs/orders.png',
            'selectedIconPath': '/static/tabs/orders-active.png'
          }, {
            'text': '我的',
            'pagePath': '/pages/mine/main',
            'iconPath': '/static/tabs/orders.png',
            'selectedIconPath': '/static/tabs/orders-active.png'
          }
        ]
      }
    },
    methods: {
      /**
       * 点击导航栏
       */
      selectNavItem (index, pagePath) {
        console.log(this.index)
        console.log(pagePath)

        if (index === this.selectNavIndex) {
          return false
        }
        if (pagePath !== '/pages/logs/main') {
          this.bindNavigateTo(pagePath)
        } else {
          wx.navigateTo({
            url: pagePath
          })
        }
      },

      /**
       * 路由跳转
       */
      bindNavigateTo (url) {
        wx.switchTab({
          url
        })
      }
    },
    computed: {
      isIphoneX () {
        return this.$store.getters.isIphoneX
      }
    }
  }
</script>

<style lang="stylus" scoped>
.box{
  height 46px
}
.tabbar-wrap 
    position fixed
    bottom 0
    left 0
    height 46px
    width 100%
    padding-top 3px
    background #fff
    box-shadow 0 0 1px #C4C4C4
    &.isIphoneX
        padding-bottom 33px
    .tabbar 
        display flex
        .tabbar-item
            flex 1  
            .tabbar-icon
                height 28px
                text-align center
                position relative
                img 
                    width 28px
                    height 28px
                    &.imgSpecial
                        width w = 42px
                        height h = 42px      
            .tabbar-text
                text-align center
                line-height 18px
                color #979795
                font-size 11px
                &.active
                    color #45b7af
            &.wrapSpecial
                .tabbar-icon
                    position absolute
                    top -18px
                    width 42px
                    height 42px
                    padding 3px
                    top -18px
                    left 50%
                    margin-left -((@width + @padding * 2 ) / 2)
                    border-radius 50%
                    border-top 1px solid #C4C4C4
                    text-align center
                .tabbar-text
                    position     relative
                    bottom -28px

</style>