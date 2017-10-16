<template>
  <div class="songList">
    <div  v-if="playlist">
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
        <div class="list_154_main_list" v-for="(item, index) in playlist.tracks">
          <router-link to=""></router-link>
          <i class="iconfont">{{index + 1}}</i>
          <div class="list_sr">
            <div class="songname">{{item.name}}</div>
            <div class="list_sr_author">
              <span class="iconfont icon-sq" v-if="item.cd"></span>
              <span class="txt">{{item.ar[0].name}} - {{item.al.name}}</span></div>
          </div>
        </div>
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
        playlist: '',
        privileges: '',
      };
    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        const self = this;
        axios('get', 'playlist/detail', {
          id: self.$route.params.id
        }, (response) => {
          if (response.code === ERR_OK) {
            self.playlist = response.playlist;
            self.privileges = response.privileges;
          }
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .songList
    width 100%
    min-height 100%
    position absolute
    left 0
    top 0
    z-index 2001
    background #fff
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
        i
          width 40px
          line-height 55px
          flex 0 0 40px
          vertical-align middle
          text-align center
          font-size 20px
        .list_sr
          flex 1
          padding-right 10px
          display inline-block
          border-bottom 1px solid #e4e4e5
          margin-top 7px
          line-height 1.5
          overflow hidden
          .songname
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .list_sr_author
            font-size 12px
            color #959696
            line-height 12px
            .iconfont
              color #fe672e
              font-size 14px
            .txt
              margin-top 10px

</style>
