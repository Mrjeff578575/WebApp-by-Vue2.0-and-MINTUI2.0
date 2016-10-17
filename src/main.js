import Vue from 'vue'
import App from './App'
import store from './vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

import login from './components/login.vue'
import index from './components/index.vue'
import order from './components/order.vue'
import goods from './components/goods.vue'
import personinfo from './components/personinfo.vue'
import test from './components/test.vue'
import push from './components/push.vue'

//注册VueRouter这个插件
Vue.use(VueRouter)
//注册MintUi
Vue.use(MintUI)
//注册Vue-resource
Vue.use(VueResource)

const routes = [
    { path: '/login', component: login },
    { path: '/index', component: index },
    { path: '/order', component: order },
    { path: '/goods', component: goods },
    { path: '/personinfo', component: personinfo },
    { path: '/test', component: test },
    { path: '/push', component: push}
]
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})
