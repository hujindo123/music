/**
 * Created by Administrator on 2017/10/24.
 */
import {axios} from '@/router/config';
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  //console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}
class Driver {
  constructor() {
    this.ERR_OK = 200;
    this.timer = {};
    this.Media = new Audio();
    this.getList = this.getList.bind(this);
    this.startTime = this.startTime.bind(this);
  }

  getList(id) {
    return new Promise((resolve, reject) => {
      axios('get', 'music/url', {
        id: id
      }, (response) => {
        if (response.code === this.ERR_OK) {
          resolve(response.data[0])
        } else {
          reject(false);
        }
      });
    })
  };

  readySong(url, totalTime, runtime) {
    var self = this;
    if (self.Media.preload === 'auto') {
      self.Media.src = url;
      self.timer = setInterval(function () {
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
  };

  startTime(totalTime) {
    var self = this;
    self.timer = setInterval(function () {
      if (self.runtime >= totalTime) {
        clearInterval(self.timer);
        return;
      } else {
        self.runtime = self.runtime + 1000;
        console.log(self.runtime);
      }
    }, 1000)
  };
}
export  {Driver, isWeiXin};
