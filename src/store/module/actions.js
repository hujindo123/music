/**
 * Created by Administrator on 2017/10/24.
 */
import * as types from '../mutations-types';
const state = {
  iSshow: false,
  play: true
};
const mutations = {
  [types.HIDE_HEADER](state, obj){
    state.play = obj.HeadersStatus;
  },
  [types.PLAY_PAGE](state, obj){
    state.iSshow = obj.status;
  }
};
export default {
  state,
  mutations
}