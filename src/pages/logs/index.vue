<template>
  <div class="form">
    <div v-for="(item,index) in formUpload" class="formlist">
      <div class="upload">
        <image class="uploadImg" mode="aspectFill center" :src="item.uploadImg"></image>
        <button @click="upload" class="uploadBtn">更换图片</button>
      </div>
      <div class="vCenter inputPanel">
        <icon type="cancel" v-show="index+1>1" :class="{'del':index+1>1}" @click="delUpload(index)"/>
        <div>
          <i-cell-group>
            <i-cell :title="formUpload.length>1?index+1+'等奖名称':'奖品名称'">
              <input slot="footer" i-class="uploadInput" :value="item.name" right placeholder="请输入奖品名称" />
            </i-cell>
            <i-cell title="请输入奖品名称">
              <input slot="footer" i-class="uploadInput" :value="item.num" maxlength="10000" type="number" right placeholder="份数" />
            </i-cell>
          </i-cell-group>
        </div>
      </div>
    </div>
    <div class="center">
      <button size="mini" class="newUpload" @click="newUpload()">+ 添加新奖项</button>
    </div>
    <i-panel title="开奖设置">
      <i-cell-group>
        <i-cell title="设置开奖条件" is-link>
          <picker slot="footer" @change="bindPickerChange" :value="index" :range="array">
            <view class="picker">
              {{array[index]}}
            </view>
          </picker>
        </i-cell>
        <i-cell v-if="index==0" title="设置开奖时间" is-link>
          <picker slot="footer" mode="multiSelector" @change="bindMultiPickerChange" :value="multiIndex" :range="newMultiArray">
            <span>{{time}}</span>
          </picker>
        </i-cell>
        <i-cell v-if="index==1" title="设置开奖人数">
          <input slot="footer" type="number" :value="num" right placeholder="人数" maxlength="10000"/>
        </i-cell>
      </i-cell-group>
    </i-panel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formUpload: [{
        uploadImg: '/static/images/uploadBanner.jpg',
        name: '',
        num: ''
      }],
      array: ['按时间自动开奖', '按人数自动开奖', '手动开奖'],
      index: 0,
      time: '',
      multiArray: [],
      multiIndex: [0, 0, 0, 0, 0],
      num: ''
    }
  },
  computed: {
    newMultiArray: () => {
      let array = []
      const date = new Date()
      const years = []
      const months = []
      const days = []
      const hours = []
      const minutes = []
      for (let i = 2018; i <= date.getFullYear() + 10; i++) {
        years.push('' + i)
      }
      array.push(years)
      for (let i = 1; i <= 12; i++) {
        if (i < 10) {
          i = '0' + i
        }
        months.push('' + i)
      }
      array.push(months)
      for (let i = 1; i <= 31; i++) {
        if (i < 10) {
          i = '0' + i
        }
        days.push('' + i)
      }
      array.push(days)
      for (let i = 0; i < 24; i++) {
        if (i < 10) {
          i = '0' + i
        }
        hours.push('' + i)
      }
      array.push(hours)
      for (let i = 0; i < 60; i++) {
        if (i < 10) {
          i = '0' + i
        }
        minutes.push('' + i)
      }
      array.push(minutes)
      return array
    }
  },
  mounted () {
    var date = new Date()
    var Y = date.getFullYear()
    var M = date.getMonth()
    M = M + 1
    if (M < 10) {
      M = '0' + M
    }
    var d = date.getDate()
    if (d < 10) {
      d = '0' + d
    }
    var h = date.getHours()
    if (h < 10) {
      h = '0' + h
    }
    var m = date.getMinutes()
    this.time = `${Y}-${M}-${d} ${h}:${m}`
  },
  methods: {
    newUpload () {
      this.formUpload.push({
        uploadImg: '/static/images/uploadBanner.jpg',
        name: '',
        num: ''
      })
    },
    delUpload (index) {
      this.formUpload.splice(index, 1)
    },
    bindPickerChange (e) {
      this.index = e.mp.detail.value
    },
    bindMultiPickerChange (e) {
      this.multiIndex = e.target.value
      const index = this.multiIndex
      const year = this.newMultiArray[0][index[0]]
      const month = this.newMultiArray[1][index[1]]
      const day = this.newMultiArray[2][index[2]]
      const hour = this.newMultiArray[3][index[3]]
      const minute = this.newMultiArray[4][index[4]]
      this.time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    }
  }
}
</script>

<style lang="scss" scoped>
.center{
  text-align: center;
  margin: 15px;
}
.formlist{
  margin-bottom:15px; 
}
.upload{
  width: 100%;
  position: relative;
  .uploadImg{
    width: 375px;
    height: 150px;
  }
  .uploadBtn{
    position: absolute;
    top: 10px;
    right: 10px;
    background: #c0b9b3;
    color: #fff;
    border: 0;
    font-size: 12px;
    border-radius: 10px;
  }
  .uploadBtn::after {
    border: none
  }
}
.newUpload{
  border: 1px solid #999999;
  color: #999;
  width: auto;
  border-radius: 0
}
.newUpload::after {
  border: none;
}
.inputPanel{
  background:#fff;
  >div{
    flex:1;
  }
  .del{
    margin:0 0 0 15px;
  }
}
</style>
<style>
.form .uploadInput{
  border-bottom: 1px solid #e9e9e9;
  position: static;
}
</style>

