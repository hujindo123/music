// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueScroller from 'vue-scroller';
import App from './App'
import store from './store/'
import index from './views/index/index'
import list from './views/list/list'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueScroller)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
const routes = [
  {path: '/', component: index},
  {path: '/list', component: list}
];
const router = new VueRouter({
  routes,
  store,
  mode: 'history'
});
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
app.$mount('#app');
