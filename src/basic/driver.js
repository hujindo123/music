/**
 * Created by Administrator on 2017/10/24.
 */
import {axios} from '@/router/config';
var isweixin = function () {
  var ua = navigator.userAgent.toLowerCase();

  if (ua.match(/MicroMessenger/i) == "micromessenger") {

    return true;

  } else {

    return false;

  }
}
class Driver {
  constructor(audio) {
    this.ERR_OK = 200;
    this.Audio = audio;
    this.playStatus = false; //播放状态
    this.duration = 0;
    this.currentTime = 0;
    this.songs = []; //歌词
    this.getUrl = this.getUrl.bind(this);
  }

  /* 搜索地址*/
  getUrl(id) {
    var self = this;
    axios('get', 'music/url', {
      id: id
    }, (response) => {
      if (response.code === this.ERR_OK) {
        self.Audio.src = response.data[0].url;
        if (this.Audio.preload === 'auto') {
          self.Audio.play();
          self.runTime();
          self.lyric(id);
        }
      }
    });
  };

  /* 进度时间 */
  runTime() {
    var self = this;
    self.Audio.addEventListener('timeupdate', function () {
      self.currentTime = self.Audio.currentTime;
      self.duration = self.Audio.duration
    })
  };

  ranger(v) {
    console.log(v)
    this.Audio.currentTime = v;
    /*this.step = document.getElementById("range").value;
     this.changeStep(document.getElementById("range").value);*/
  };

  /*播放&暂停*/
  playOrpuase(v) {
    alert(v);
    alert(this.Audio);
    v ? this.Audio.play() : this.Audio.pause();
  };

  /*歌词*/
  lyric(id) {
    var self = this;
    axios('get', '/lyric', {
      id: id
    }, (response) => {
      if (response.code === this.ERR_OK) {
        response.lrc.lyric.split('\n').map(function (i) {
          // body...
          //console.log(moment(this.driver.currentTime * 1000).format("mm:ss.SSS"));
          self.songs.push({
            time: i.split(']')[0].split('[')[1],
            songs: i.split(']')[1]
          })
        });
        //console.log(self.songs);
      }
    });
  };

  preSong() {

  };

  nextSong() {
  };
}
export  {Driver, isweixin};
