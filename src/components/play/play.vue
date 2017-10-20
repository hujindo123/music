<template>
  <div
    style="background: #ccc;position: relative;width: 100%;height: 100%;overflow: hidden;display: flex;flex-flow: column">
    <div class="song-turn_heade">
      <div class="back iconfont icon-fanhui"></div>
      <div class="title">
        <div>洒下的</div>
        <span style="font-size: 12px">张宇</span>
      </div>
    </div>
    <div class="rotate_song">
      <div class="img">
        <img
          src="http://p1.music.126.net/ZF8u_N5jo73RP7FAUSKaaQ==/96757023256481.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0"
          alt="">
      </div>
    </div>
    <div class="play_bottom">
      <div class="time">
        <span class="start-time">00:00</span>
        <div class="range"><input type="range" id="myRange" :max="max" :style="{'backgroundSize': style}"
                                  v-model="value" @change="range(value)"></div>
        <span class="end-time">04:22</span>
      </div>
      <div class="songs_list"></div>
      <div class="actions_play">
        <span class="iconfont icon-weibiaoti-"></span>
        <span class="iconfont" @click="playOrpuase" :class="{'icon-bofang1': play, 'icon-cplay1': !play}"></span>
        <span class="iconfont icon-weibiaoti-1"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {axios} from '@/router/config';
  const ERR_OK = 200;
  export default {
    data () {
      return {
        value: 0,
        max: 1,
        count: 0,
        timer: '',
        play: true,
        Media: new Audio(),
        songsMessage: '',
        songs: ''
      }
    },
    created () {
      this.songsList = JSON.parse(localStorage.getItem('playList'));
      console.log(this.songsList);
      this.getList();

    },
    computed: {
      style () {
        return `${((this.value / this.max) * 100).toFixed(1)}% 100%`;
      }
    },
    methods: {
      isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        //console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true;
        } else {
          return false;
        }
      },
      getList () {
        const self = this;
        axios('get', 'music/url', {
          id: self.$route.params.id
        }, (response) => {
          if (response.code === ERR_OK) {
            self.songs = response.data[0];
            self.readySong();
          }
        });
      },
      readySong (){
        var self = this;
        self.Media.src = self.songs.url;
        if (self.Media.preload === 'auto') {
          if (self.isWeiXin()) {
            self.play = false;
            alert(this.play);
            //console.log("是来自微信内置浏览器")
          } else {
            self.startTime();
            self.Media.play();
            //console.log("不是来自微信内置浏览器")
          }
        }
      },
      startTime(){
        var self = this;
        const time = 3 * 60 * 1000;
        this.max = time;
        this.timer = setInterval(function () {
          if (self.value >= time) {
            clearInterval(self.timer);
            return;
          }
          self.value = self.value + 1000;
          //console.log(self.value);
        }, 1000)
      },
      range(v){
        this.value = parseInt(v);
      },
      playOrpuase () {
        this.play = !this.play;
        if (this.play) {
          this.Media.play();
          this.startTime();
        } else {
          this.Media.pause();
          clearInterval(this.timer);
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .song-turn_heade
    width 100%
    height 44px
    flex 0 0 44px
    padding 4px 0
    box-sizing border-box
    position relative
    color #fff
    &::after
      width 100%
      height 1px
      content ''
      position absolute
      bottom -3px
      background url("../../../static/img/repeat-x.png") center center repeat-x
      background-size 1px 1px
    .back
      position absolute
      padding-left 10px
      line-height 36px
    .title
      text-align center
      line-height 1.2

  .rotate_song
    box-sizing border-box
    position relative
    background url("../../../static/img/disc-ip6.png") center center no-repeat rgba(255, 255, 255, 0.20);
    border-radius 50%
    margin 20px auto 0
    overflow hidden

  @media screen and (max-width: 321px) {
    .rotate_song {
      width 180px
      height 180px
      flex 0 0 180px
      background-size 174px 174px
      .img {
        width 110px
        height 110px
        position relative
        left 50%
        margin-left -55px
        top 50%
        margin-top -55px
        overflow hidden
        img {
          width 100%
          display block
          border-radius 50%
        }
      }
    }
  }

  @media screen and (min-width: 321px) and (max-width: 400px) {
    .rotate_song {
      width 248px
      height 248px
      flex 0 0 248px
      background-size 242px 242px
      .img {
        width 150px
        height 150px
        position relative
        left 50%
        margin-left -75px
        top 50%
        margin-top -75px
        overflow hidden
        img {
          width 100%
          display block
          border-radius 50%
        }
      }
    }
  }

  .play_bottom
    width 100%
    padding 0 10px
    box-sizing border-box
    display flex
    flex 1
    flex-flow column
    .time
      width 100%
      margin-top 20px
      display flex
      flex-flow row
      color #fff
      .start-time
        flex 0 0 35px
      .range
        flex 1
        padding 0 10px
        height 16px
        line-height 8px
        input[type=range]
          -webkit-appearance: none;
          width 100%
          background: -webkit-linear-gradient(#d13d33, #d13d33) no-repeat, #807772;
          background-size: 75% 100%;
        /*设置左右宽度比例*/
        input[type=range]::-webkit-slider-thumb
          -webkit-appearance: none;
        input[type=range]::-webkit-slider-runnable-track {
          height: 2px;
        }
        input[type=range]:focus {
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          margin-top: -10px; /*使滑块超出轨道部分的偏移量相等*/
          background: #d13d33;
          border-radius: 50%; /*外观设置为圆形*/
          border: solid 7px #ffffff; /*设置边框*/
        }

      .end-time
        flex 0 0 35px

  .songs_list
    flex 1

  .actions_play
    flex 0 0 50px
    padding 0 40px 30px
    display flex
    flex-flow row
    justify-content space-around
    align-content center
    height 50px
    line-height 50px
    color #fff
    .iconfont
      font-size 40px
    .icon-bofang
      font-size 50px

</style>
