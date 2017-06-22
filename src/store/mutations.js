/**
 * Created by Administrator on 2017/6/16.
 */
import * as types from './mutations-types';
export default {
  [types.ADD_CART](state){
    console.log(types.ADD_CART);
    state.score++
  }
}

