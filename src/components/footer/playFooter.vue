<template>
  <div>
    <div class="footer">
      <div class="footerplayLeft">
        <img @click.stop="showPlay"
             :src="this.$store.state.playAction.songList[this.$store.state.playAction.playNum].al.picUrl||this.$store.state.playAction.songList[this.$store.state.playAction.playNum].album.blurPicUrl"
             alt="">
      </div>
      <div class="userMessage">
        <div class="songname">
          {{this.$store.state.playAction.songList[this.$store.state.playAction.playNum].ar[0].name}}
        </div>
        <div class="songauthor">
          {{this.$store.state.playAction.songList[this.$store.state.playAction.playNum].al.name}}
        </div>
      </div>
      <div class="footer_action">
        <i class="iconfont" :class=" this.$store.state.playAction.playStatus ? 'icon-zanting1' : 'icon-bofang-copy'"
           @click.stop="playOrpuase()"></i>
        <i class="iconfont icon-xiayishou" @click.stop="nextSong"></i>
      </div>
    </div>
    <div class="play_main" v-if="isShow">
      <div class="song-turn_heade">
        <div class="back iconfont icon-fanhui" @click="isShow =false"></div>
        <div class="title">
          <div>{{this.$store.state.playAction.songList[this.$store.state.playAction.playNum].ar[0].name}}</div>
          <span
            style="font-size: 12px">{{this.$store.state.playAction.songList[this.$store.state.playAction.playNum].al.name}}</span>
        </div>
      </div>
      <div class="rotate_song">
        <div class="img">
          <img :src="this.$store.state.playAction.songList[this.$store.state.playAction.playNum].al.picUrl" alt="">
        </div>
      </div>
      <div class="play_bottom">
        <div class="time">
          <span class="start-time">{{runTime}}</span>
          <div class="range">
            <input type="range"
                   :max="driver.duration"
                   :style="{'backgroundSize': style}"
                   v-model="step"
                   id="range"
                   @change="ranger()">
          </div>
          <span class="end-time">{{totalTime}}</span>
        </div>
        <div class="songs_list">
          <i>{{upSongs}}</i>
          <i class="middle">{{mdSongs}}</i>
          <i>{{dnSongs}}</i>
        </div>
        <div class="actions_play">
          <span class="iconfont icon-weibiaoti-" @click="driver.preSong"></span>
          <span class="iconfont" @click="playOrpuase"
                :class="{'icon-bofang1': this.$store.state.playAction.playStatus, 'icon-cplay1': !this.$store.state.playAction.playStatus}"></span>
          <span class="iconfont icon-weibiaoti-1" @click.stop="driver.nextSong"></span>
        </div>
      </div>
    </div>
    <audio id="audio" src=""></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  const moment = require('moment');
  //import * as moment from 'moment';
  const audio = document.getElementById('audio');
  import {Driver, isweixin} from '@/basic/driver';
  export default{
    data(){
      return {
        isShow: false,
        locked: false,
        driver: '',
        upSongs: '',
        mdSongs: '',
        dnSong: ''
      };
    },
    mounted(){
      this.driver = new Driver(document.getElementById('audio'));
      if (isweixin()) {
        this.$store.commit('LOCKED', {status: false});
      } else {
        this.$store.commit('LOCKED', {status: true});
      }
      this.driver.getUrl(this.$store.state.playAction.songList[this.$store.state.playAction.playNum].id);
    },
    computed: {
      step(){
        return this.driver.currentTime;
      },
      totalTime (){
        return moment(this.driver.duration * 1000).format("mm:ss");
      },
      style () {
        return `${((this.driver.currentTime / this.driver.duration) * 100).toFixed(1)}% 100%`;
      },
      runTime(){
        return moment(this.driver.currentTime * 1000).format("mm:ss");
      },
      playNum(){
        return this.$store.state.playAction.playNum;
      },
      checkSongs(){
        return moment(this.driver.currentTime * 1000).format("mm:ss.SSS");
      }
    },
    watch: {
      playNum: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.driver.getUrl(this.$store.state.playAction.songList[this.$store.state.playAction.playNum].id);
        }
      },
      checkSongs: function (newValue, oldValue) {
        var Arr = this.driver.songs;
        var self = this;
        Arr.forEach(function (item, index, arr) {
          if (newValue >= item.time) {
            if (index > 0) {
              self.upSongs = arr[index - 1].songs;
            }
            self.mdSongs = arr[index].songs;
            if (index <= arr.length) {
              self.dnSongs = arr[index + 1].songs;
            }
          }
        })
        //console.log(newValue, oldValue);
      },
    },
    methods: {
      showPlay(){
        this.isShow = true;
      },
      playOrpuase(){
        this.$store.commit('LOCKED', {status: !this.$store.state.playAction.playStatus});
        this.driver.playOrpuase(this.$store.state.playAction.playStatus);
      },
      ranger(){
        this.driver.ranger(document.getElementById("range").value);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer
    width 100%
    height 60px
    box-sizing border-box
    padding 4px
    flex 1
    bottom 0
    left 0
    position fixed
    background rgba(0, 0, 0, 0.9)
    z-index 2000;
    .footerplayLeft
      width 52px
      height 52px
      flex 0 0 52px
      img
        border-radius 4px
        display block
        width 100%
    .userMessage
      flex 1
      color #fff
      padding 5px
      flex-flow column
      .songname
        font-size 14px
        line-height 1.8
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
      .songauthor
        font-size 12px
        color #888
        line-height 1.2
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
    .footer_action
      display flex
      flex 0 0 120px
      color #fff
      line-height 52px
      position relative
      justify-content space-around
      align-items center
      .iconfont
        display inline-block
        width 32px
        height 52px
      .icon-xiayishou
        text-align right

  .play_main
    width 100%
    background: #ccc;
    position: fixed;
    display flex
    flex-flow column
    top: 0;
    left 0
    z-index: 3000;
    height: 100%;
    overflow: hidden;

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

  @media screen and (min-width: 321px) {
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
    justify-content center
    align-items center
    text-align center
    display flex
    flex-flow column
    i
      display block
      font-style normal
      min-height 40px
      line-height 40px
    .middle
      color #fff

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
