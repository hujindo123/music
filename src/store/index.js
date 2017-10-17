/**
 * Created by Administrator on 2017/6/15.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import getters from './getters';
import actions from './actions'
Vue.use(Vuex);

var state = {
  HeadersStatus: true
};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});


