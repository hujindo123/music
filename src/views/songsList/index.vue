<template>
  <div class="songList">
    <pulse-loader :loading="loading.load" :color="loading.color" :size="loading.size" :margin="loading.margin"
                  :radius="loading.radius" class="loading" v-show="loading.load"></pulse-loader>
    <div v-if="playlist && !this.$store.state.playAction.playPage" class="main_10_20">
      <div class="list_top_1415">
        <div class="list_top_1415_bg" :style="{background: 'url('+playlist.picUrl+')'}"></div>
        <div class="list_top_1415_top">
          <img :src="playlist.picUrl" alt="" class="list_top_1415_img">
          <div class="list_top_1415_right">
            <div class="list_top_1415_title">{{playlist.name}}</div>
            <div class="list_top_141_user">
              <img :src="playlist.creator.avatarUrl" class="header_578" alt="">
              <div class="list_top_nickname">{{playlist.creator.nickname}}</div>
            </div>
          </div>
        </div>
        <ul class="list_top_nav">
          <li>
            <div class="iconfont icon-tianjiawenjian"></div>
            <span>{{playlist.subscribedCount}}</span>
          </li>
          <li>
            <div class="iconfont icon-pinglun"></div>
            <span>{{playlist.commentCount}}</span></li>
          <li>
            <div class="iconfont icon-fenxiang"></div>
            <span>{{playlist.shareCount}}</span></li>
          <li>
            <div class="iconfont icon-xiazai"></div>
            <span>下载</span></li>
        </ul>
      </div>
      <div class="list_154_main">
        <div class="list_154_main_top">
          <i class="iconfont icon-bofang"></i>
          <span>全部播放 <em> (共{{playlist.tracks.length}}首)</em></span>
        </div>
        <div class="list_154_main_list" v-for="(item, index) in playlist.tracks" @click="play(index)">
          <i class="iconfont index">{{index + 1}}</i>
          <div class="list_sr">
            <div class="songname">{{item.ar[0].name }} - {{ item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <transition name="play">
      <play v-if="this.$store.state.playAction.playPage" :plays="playOrpuase" :changeStep="currentTime" :next="next"
            :pre="pre"></play>
    </transition>
    <playFooter v-if="footerPlayShow" :plays="playOrpuase" :next="next"></playFooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Driver} from '@/basic/driver';
  import {axios} from '@/router/config';
  import play from '@/components/play/play'
  import playFooter from '@/components/footer/playFooter';
  import PulseLoader from 'vue-spinner/src/BeatLoader.vue';
  const driver = new Driver();
  const ERR_OK = 200;
  export default {
    data () {
      return {
        loading: {
          color: "#f63",
          size: '10px',
          margin: '3px',
          radius: '50%',
          load: true
        },
        footerPlayShow: false,
        playlist: '',
        runTime: ''
      };
    },
    created () {
      this.getList();
    },
    components: {
      play,
      'playFooter': playFooter,
      'pulse-loader': PulseLoader
    },
    methods: {
      getList () {
        const self = this;
        axios('get', 'playlist/detail', {
          id: self.$route.params.id
        }, (response) => {
          if (response.code === ERR_OK) {
            self.loading.load = false;
            self.playlist = response.playlist;
            self.$store.dispatch('GET_SONG_LIST', {list: response.playlist.tracks});
          }
        });
      },
      play (index) {
        this.footerPlayShow = true;
        if (index < 0 || index > this.$store.state.playAction.songList.length) {
          index = this.$store.state.playAction.playNum;
        }
        this.$store.commit('PLAY_INDEX_ID', {index: index});
        driver.getUrl(this.$store.state.playAction.songList[this.$store.state.playAction.playNum].id, this)
      },
      /*暂停*/
      playOrpuase(){
        this.$store.commit('LOCKED', {status: !this.$store.state.playAction.playStatus});
        driver.playOrpuase(this.$store.state.playAction.playStatus);
      },
      /* 快进 */
      currentTime (t){
        driver.Audio.currentTime = t;
      },
      /*下一首*/
      next(){
        debugger;
        this.play(this.$store.state.playAction.playNum + 1);
      },
      pre(){
        this.play(this.$store.state.playAction.playNum - 1);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .songList
    width 100%
    height 100%
    .main_10_20
      padding-bottom 60px
      overflow-y scroll
      -webkit-overflow-scrolling: touch;
      .list_top_1415
        width 100%;
        height 200px;
        position relative
        background rgba(0, 0, 0, 0.5)
        display flex
        flex-flow column
        overflow hidden
        .list_top_1415_bg
          width 100%
          height 100%
          background-size cover
          filter: blur(20px)
          transform scale(1.3)
        .list_top_1415_top
          width 100%
          padding 25px 15px 0 15px
          top 0
          box-sizing border-box
          position absolute
          z-index 1000
          display flex
          flex-flow row
          .list_top_1415_img
            width 113px
            height 113px
            flex 0 0 113px
          .list_top_1415_right
            box-sizing border-box
            padding-left 15px
            flex 0 0 1
            .list_top_1415_title
              color #fff
              line-height 1.3
              font-size 17px
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            .list_top_141_user
              padding-top 15px
              .header_578
                display inline-block
                width 30px
                height 30px
                border-radius 50%
                vertical-align top
              .list_top_nickname
                line-height 30px
                display inline-block
                margin-right 5px
                color #d0cdca
        .list_top_nav
          width 100%
          display flex
          position absolute
          bottom 5px
          left 0
          flex-flow row
          justify-content space-between
          align-items center
          text-align center
          li
            color #fff
            flex 1
            font-size 13px
            .iconfont
              font-size 22px
              margin-bottom 8px
            span
              color #d0ccca
              font-weight 500
      .list_154_main
        width 100%
        box-sizing border-box
        .list_154_main_top
          position relative
          height 50px
          line-height 50px
          display flex
          i
            width 40px
            flex 0 0 40px
            vertical-align middle
            text-align center
            font-size 20px
            color #999
          span
            flex 1
            padding-right 10px
            display inline-block
            border-bottom 1px solid #e4e4e5
            em
              font-style: normal
              color #959696
              font-size 12px
        .list_154_main_list
          position relative
          display flex
          height 55px
          line-height 55px
          color #323233
          i
            width 40px
            flex 0 0 40px
            vertical-align middle
            text-align center
            font-size 20px
            color #999
          .list_sr
            flex 1
            padding-right 10px
            display inline-block
            border-bottom 1px solid #e4e4e5
            overflow hidden
            .songname
              overflow hidden
              white-space nowrap
              text-overflow ellipsis

  .play-enter-active
    transition: all .5s cubic-bezier(0.2,0.4,0.6,1);
  .play-leave-active
    transition: all .3s ease;
  .play-enter, .play-leave-to
    transform: translateX(100%);
    opacity: 0;
</style>
