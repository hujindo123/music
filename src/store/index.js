/**
 * Created by Administrator on 2017/6/15.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import playAction from './module/play';

Vue.use(Vuex);

const state = {};
const mutations = {};
const actions = {};
const getters = {};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    playAction
  }
});


