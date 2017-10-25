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
}
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

  runTime() {
    var self = this;
    self.Audio.addEventListener('timeupdate',function () {
      console.log(self.Audio.currentTime);
      console.log(self.Audio.duration);
      var progressValue =  self.Audio.currentTime/ self.Audio.duration; //用时间比来获取进度条的值
    })
   /* self.timer = setInterval(() => {
      self.count = self.count + 1000;
      self.$store.dispatch('SET_RUN_TIME', {num: self.count});
    }, 1000)*/
  };

  fast(v) {
    this.Audio.currentTime = (v / 1000).toFixed(0);

  }
}
export  {Driver, isWeiXin};
