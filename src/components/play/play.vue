<template>
  <div class="play_main">
    <div class="song-turn_heade">
      <div class="back iconfont icon-fanhui" @click="hidePage"></div>
      <div class="title">
        <div>{{this.$store.state.playAction.songs.songName}}</div>
        <span style="font-size: 12px">{{this.$store.state.playAction.songs.singeName}}</span>
      </div>
    </div>
    <div class="rotate_song">
      <div class="img">
        <img :src="this.$store.state.playAction.songs.bg" alt="">
      </div>
    </div>
    <div class="play_bottom">
      <div class="time">
        <span class="start-time">{{runTime}}</span>
        <div class="range">
          <input type="range"
                 :max="this.$store.state.playAction.songs.totalTime"
                 :style="{'backgroundSize': style}"
                 v-model="step"
                 id="range"
                 @change="ranger()">
        </div>
        <span class="end-time">{{totalTime}}</span>
      </div>
      <div class="songs_list"></div>
      <div class="actions_play">
        <span class="iconfont icon-weibiaoti-" @click.stop="preSong"></span>
        <span class="iconfont" @click="playOrpuase"
              :class="{'icon-bofang1': this.$store.state.playAction.playStatus, 'icon-cplay1': !this.$store.state.playAction.playStatus}"></span>
        <span class="iconfont icon-weibiaoti-1" @click.stop="nextSong"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {axios} from '@/router/config';
  import * as moment from 'moment';
  export default {
    data () {
      return {
        value: 0,
        a: 0
      }
    },
    props: {
      plays: {
        type: Function,
        default: null,
      },
      changeStep: {
        type: Function,
        default: null,
      },
      next: {
        type: Function,
        default: null,
      },
      pre: {
        type: Function,
        default: null,
      }
    },
    computed: {
      step(){
        return this.$store.state.playAction.songs.runTime
      },
      totalTime (){
        return moment(this.$store.state.playAction.songs.totalTime * 1000).format("mm:ss");
      },
      style () {
        return `${((this.$store.state.playAction.songs.runTime / this.$store.state.playAction.songs.totalTime) * 100).toFixed(1)}% 100%`;
      },
      runTime(){
        return moment(this.$store.state.playAction.songs.runTime * 1000).format("mm:ss");

      }
    },
    methods: {
      hidePage(){
        this.$store.commit('PLAY_PAGE', {status: false});
      },
      ranger(){
        this.step = document.getElementById("range").value;
        this.changeStep(document.getElementById("range").value);
      },
      playOrpuase () {
        this.plays();
      },
      nextSong(){
        this.next();
      },
      preSong(){
        this.pre();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .play_main
    background: #ccc;
    position: absolute;
    top:0;
    width: 100%;
    z-index:3000;
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
