/**
 * Created by Administrator on 2017/6/16.
 */
import * as types from './mutations-types';
export default {
  [types.HIDE_HEADER](state, obj){
    state.HeadersStatus = obj.HeadersStatus;
  }
}

