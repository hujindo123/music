/**
 * Created by Administrator on 2017/10/24.
 */
import moment from 'moment';
import {isWeiXin, Driver} from '@/basic/middle';
import * as types from '../mutations-types';
//state
const driver = new Driver();
const state = {
  playPage: false, //播放页面
  playStatus: isWeiXin() ? false : true, //播放状态
  songList: [], //歌曲列表
  playNum: 0,//播放第几首
  songs: {
    singeName: '',
    totalTime: '00:00',
    totalTime2: 0,
    bg: '',
    songName: '',
    url: '',
    runTime: '00:00',
    runTime2: 0
  }
};
var timer;
const getters = {};
const actions = {
  [types.GET_SONG_LIST] ({state}, obj){
    state.songList = obj.list;
  },
  [types.GET_URL]({state}, obj){
    state.playNum = obj.index;
    state.songs.singeName = state.songList[state.playNum].ar[0].name;
    state.songs.totalTime2 = state.songList[state.playNum].dt;
    state.songs.totalTime = moment(state.songList[state.playNum].dt).format("mm:ss");
    state.songs.bg = state.songList[state.playNum].al.picUrl;
    state.songs.songName = state.songList[state.playNum].name;
    driver.getList(state.songList[state.playNum].id).then((data) => {
      state.songs.url = data.url;
      let Media = new Audio();
      if (Media.preload === 'auto') {
        Media.src = state.songs.url;
        Media.play();
        timer = setInterval(function () {
            if (runtime >= totalTime) {
              console.log('aa')
              clearInterval(self.timer);
              return;
            } else {
              runtime = runtime + 1000;
              console.log(self.runtime);
            }
          }, 1000)
      }
      //driver.readySong(state.songs.url, state.songs.totalTime2, state.songs.runTime2);
    });
  }

};
const mutations = {
  [types.LOCKED](state, obj){
    state.playStatus = obj.status;
  },
  [types.PLAY_PAGE](state, obj){
    state.playPage = obj.status;
  }

};
export default {
  state,
  getters,
  actions,
  mutations
}
