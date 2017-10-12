<template>
  <div>
    <div class="list_top_1415" v-if="playlist">
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
      <div class="iconfont icon-pinglun" style="color: #fff"></div>
      <ul>
        <li>
          <i class="iconfont icon-pinglun"></i>
          <span>19975</span>
        </li>
        <li><i></i></li>
        <li><i></i></li>
        <li><i></i></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {axios} from '@/router/config';
  const ERR_OK = 200;
  export default {
    data () {
      return {
        playlist: ''
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
          }
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list_top_1415
    width 100%;
    height 200px;
    position relative
    background rgba(0,0,0,0.5)
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
</style>
