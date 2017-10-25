<template>
  <div class="footer" @click="showPlay">
    <div class="footerplayLeft">
      <img :src="this.$store.state.playAction.songs.bg" alt="">
    </div>
    <div class="userMessage">
      <div class="songname">{{this.$store.state.playAction.songs.songName}}</div>
      <div class="songauthor">{{this.$store.state.playAction.songs.singeName}}</div>
    </div>
    <div class="footer_action">
      <i class="iconfont" :class="this.$store.state.playAction.playStatus ? 'icon-zanting1' : 'icon-bofang-copy'" @click.stop="stop"></i>
      <i class="iconfont icon-xiayishou"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import play from '@/components/play/play'
  export default{
    data(){
      return {
        iSshow: false
      };
    },
    created(){},
    components: {
      play
    },
    methods: {
      stop () {
        this.isclick = this.$store.commit('LOCKED',{status: !this.$store.state.playAction.playStatus});
      },
      /* 跳转页面 */
      showPlay(){
        this.$store.commit('PLAY_PAGE', {status: true});
      }
    },
    computed: {
      playMusic(){
        console.log(this.$store.state.play);
        return this.$store.state.play;
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

   /* .plays
      width 100%
      height 100%
      overflow hidden
      position absolute
      z-index 2000
      top 0
      left 0
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
              !*设置左右宽度比例*!
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
                margin-top: -10px; !*使滑块超出轨道部分的偏移量相等*!
                background: #d13d33;
                border-radius: 50%; !*外观设置为圆形*!
                border: solid 7px #ffffff; !*设置边框*!
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
*/
</style>
