import Vue from 'vue'
import App from './App'
import store from './store'
import '../static/css/common.css'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
Vue.prototype.baseApi = 'https://cj.ccfancy.com'
Vue.prototype.$store = store

app.$mount()
