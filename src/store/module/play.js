/**
 * Created by Administrator on 2017/10/24.
 */
import moment from 'moment';
import * as types from '../mutations-types';
//state
const state = {
  playPage: false, //播放页面
  playStatus: true, //播放状态 // isWeiXin() ? false :
  songList: [], //歌曲列表
  playNum: 0,//播放第几首
  songs: {
    singeName: '',
    totalTime: 0,
    bg: '',
    songName: '',
    runTime: 0,
  }
};
const getters = {};
const actions = {
  [types.GET_SONG_LIST] ({state}, obj){
    state.songList = obj.list;
  },
  [types.GET_SONG_LIST_SEARCH] ({state}, obj){
    state.songList = obj.list;
  },

  [types.GET_RUN_TIME] ({state}, obj){
    state.songs.runTime = obj.currentTime;
    state.songs.totalTime =  obj.duration;
  }
};
const mutations = {
  [types.LOCKED](state, obj){
    state.playStatus = obj.status;
  },
  [types.PLAY_PAGE](state, obj){
    state.playPage = obj.status;
  },
  [types.PLAY_INDEX_ID](state, obj){
    state.playNum = obj.index;
    state.songs.singeName = state.songList[state.playNum].ar[0].name;
    state.songs.totalTime = state.songList[state.playNum].dt;
    state.songs.bg = state.songList[state.playNum].al.picUrl;
    state.songs.songName = state.songList[state.playNum].name;
  },
  [types.PLAY_INDEX_ID_SEARCH](state, obj){
    state.playNum = obj.index;
    state.songs.singeName = state.songList[state.playNum].artists[0].name;
    state.songs.totalTime = state.songList[state.playNum].duration;
    state.songs.bg = state.songList[state.playNum].artists[0].picUrl;
    state.songs.songName = state.songList[state.playNum].name;
  }

};
export default {
  state,
  getters,
  actions,
  mutations
}
