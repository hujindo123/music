// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueScroller from 'vue-scroller';
import App from './App'
import store from './store/'
import routes from './router/'

Vue.use(VueRouter)
Vue.use(VueScroller)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
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
