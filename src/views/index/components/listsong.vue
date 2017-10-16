<template>
  <div class="recommend">
    <div class="listsong_title" v-if="highquality.length > 0">
      <div class="list_pic">
        <img :src="highquality[0].coverImgUrl" alt="">
      </div>
      <div class="list_right">
        <img src="../../../../static/img/huangguan.png" alt="" class="icon">
        <h1>精品歌单 </h1><i class="icon-more"></i>
        <h2 class="list_right_desc">{{highquality[0].name}}</h2>
        <h3 class="list_right_dr">{{highquality[0].copywriter}}</h3>
      </div>
    </div>
    <div class="listsong_type">
      <div class="listsong_total">
        全部歌单
      </div>
      <div class="listsong_total_rigth">
        <span>欧美</span><span>摇滚</span><span>民谣</span>
      </div>
    </div>
    <noTitleList :playlist="playlist"></noTitleList>
  </div>
</template>

<script type="text/ecmascript-6">
  import {axios} from '@/router/config';
  import noTitleList from '@/components/list/noTitleList';
  const ERR_OK = 200;
  export default {
    data(){
      return {
        highquality: [],
        playlist: []
      }
    },
    created(){
      /* 精品歌单头部 */
      axios('get', 'top/playlist/highquality', {}, (response) => {
        if (response.code === ERR_OK) {
          this.highquality = response.playlists;
        }
      });
      axios('get', 'top/playlist', {}, (response) => {
        if (response.code === ERR_OK) {
          this.playlist = response.playlists;
        }
      });
      /* this.$axios.get('/api/top/playlist').then((response) => {
       response = response.data;
       })*/
    },
    components: {
      noTitleList
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommend
    width 100%
    height auto
    overflow hidden
    position relative
    .listsong_title
      box-sizing border-box
      padding 10px 10px 10px 10px
      flex 1
      display flex
      background rgba(106, 106, 106, 0.78)
      .list_pic
        width 100px
        height 100px
        flex 0 0 100px
        overflow hidden
        img
          display block
          width 100%
      .list_right
        padding 5px 0 0 10px
        flex 1
        box-sizing border-box
        overflow hidden
        .icon
          width 23px
          height 23px
          display inline-block
        h1
          display inline-block
          color #fff
          vertical-align super
          letter-spacing 2px
        .icon-more
          font-size 23px
          display inline-block
          margin-top -15px
          vertical-align middle
          color rgba(255, 255, 255, 0.7)
        .list_right_desc
          font-size 14px
          padding 15px 0
          flex 0 0 1
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          color #fff
        .list_right_dr
          color #c0c0c1
          font-size 12px
          flex 0 0 1
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
    .listsong_type
      padding 20px 10px
      .listsong_total
        width 110px
        display inline-block
        box-sizing border-box
        padding 7px 14px
        border 1px solid #c9cacb
        border-radius 15px
        letter-spacing 2px
        font-size 15px
        background url("../../../../static/img/more.png") 80px center no-repeat
        background-size 18px 18px
      .listsong_total_rigth
        padding 7px 0 7px 14px
        font-size 15px
        float right
        span
          color #646566
        :after
          content '|'
          width 1px
          margin 0 8px
          color #e2e3e4
        :last-child
          &::after
            content ''
            margin 0
            width 0
</style>
