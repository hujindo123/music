<template>
  <div class="newfooter">
    <div class="footer" @click="showPlay">
      <div class="footerplayLeft">
        <img :src="playlist[indexs].al.picUrl" alt="">
      </div>
      <div class="userMessage">
        <div class="songname">{{playlist[indexs].name}}</div>
        <div class="songauthor">{{playlist[indexs].ar[0].name }}</div>
      </div>
      <div class="footer_action">
        <i class="iconfont" :class=" isclick ? 'icon-zanting1' : 'icon-bofang-copy'" @click.stop="stop"></i>
        <i class="iconfont icon-xiayishou"></i>
      </div>
    </div>
    <div v-show="iSshow" class="plays">
      <play></play>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import play from '@/components/play/play'
  export default{
    data(){
      return {
        isclick: true,
        iSshow: false
      };
    },
    /*
     *   this.playlist = this.playlist.tracks;
     this.indexs = index;*/
    props: {
      playlist: {
        type: Array,
        default: [],
      },
      indexs: {
        type: Number,
        default: 0
      }
    },
    components: {
      play
    },
    methods: {
      stop () {
        this.isclick = !this.isclick;
      },
      showPlay(){
        this.iSshow = true;
      }
    },
    computed: {
      playMusic(){
          console.log(this.$store.state.play)
        return this.$store.state.play;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .newfooter
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

    .plays
      width 100%
      height 100%
      overflow hidden
      position absolute
      z-index 2000
      top 0
      left 0
</style>
