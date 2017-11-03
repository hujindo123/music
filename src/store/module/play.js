/**
 * Created by Administrator on 2017/10/24.
 */
import * as types from '../mutations-types';
//state
const state = {
  playNum: 0,//播放第几首
  songList: [], //歌曲列表
  playStatus: false

 /* playPage: false, //播放页面
  playStatus: true, //播放状态 // isWeiXin() ? false :
  songList: [], //歌曲列表

  songs: {
    singeName: '',
    totalTime: 0,
    bg: '',
    songName: '',
    runTime: 0,
  }*/
};
const getters = {};
/*const actions = {
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
};*/
const mutations = {
  [types.PLAY_INDEX_ID](state, obj){
    state.playNum = obj.index;
    state.songList =obj.playlist;
  },
  [types.LOCKED](state, obj){
    console.log('obj'+ obj.status)
    state.playStatus = obj.status;
  },






  [types.PLAY_PAGE](state, obj){
    state.playPage = obj.status;
  },

  [types.PLAY_INDEX_ID_SEARCH](state, obj){
    state.playNum = obj.index;
    state.songs.singeName = state.songList[state.playNum].artists[0].name;
    state.songs.totalTime = state.songList[state.playNum].duration;
    state.songs.bg = state.songList[state.playNum].album.blurPicUrl;
    state.songs.songName = state.songList[state.playNum].name;
  }

};
export default {
  state,
  getters,
  mutations
}
