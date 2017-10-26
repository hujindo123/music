/**
 * Created by Administrator on 2017/10/24.
 */
import {axios} from '@/router/config';
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
};

class Driver {
  constructor() {
    this.ERR_OK = 200;
    this.Audio = new Audio();
    this.count = 0;
    this.timer = '';
    //this.duration = 0;
    this.$store = '';
    this.currentTime = this.Audio.currentTime;
    this.getUrl = this.getUrl.bind(this);
  }
  /* 搜索地址*/
  getUrl(id, env) {
    var self = this;
    this.$store = env.$store;
    axios('get', 'music/url', {
      id: id
    }, (response) => {
      if (response.code === this.ERR_OK) {
        self.Audio.src = response.data[0].url;
        if (this.Audio.preload === 'auto') {
          self.Audio.play();
          self.runTime();
        }
      }
    });
  };
  /* 进度时间 */
  runTime() {
    var self = this;
    self.Audio.addEventListener('timeupdate', function () {
      self.$store.dispatch('GET_RUN_TIME', {currentTime: self.Audio.currentTime, duration: self.Audio.duration});
    })
  };
  /*播放&暂停*/
  playOrpuase(v) {
    v ? this.Audio.play() : this.Audio.pause();
  };
  /*上一首*/
  pre(){

  }
  /*下一首*/
}
export  {Driver, isWeiXin};
