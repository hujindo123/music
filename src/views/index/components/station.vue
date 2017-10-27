<template>
  <div class="station">
    <div class="search">
      <div class="search_style">
        <i class="iconfont icon-sousuo_sousuo"></i>
        <input type="search" v-model="keywords" @keyup="hotSearch" placeholder="搜索歌曲、歌手、专辑">
      </div>
    </div>
    <div class="com_list" v-if="data1">
      <h3 @click="searchSong(keywords)">搜索“{{keywords}}”</h3>
      <ol>
        <li>
          <i class="iconfont icon-sousuo_sousuo"></i>
          <div class="searchname" @click="searchSong(data1.artists[0].name)">{{data1.artists[0].name}}</div>
        </li>
        <li v-for="x in data1.songs">
          <i class="iconfont icon-sousuo_sousuo"></i>
          <div class="searchname" @click="searchSong(x.name)">{{x.name}}</div>
        </li>
      </ol>
    </div>
    <div class="com_list" v-if="!data1">
      <ol>
        <li>
          <i class="iconfont icon-time"></i>
          <div class="searchname"><i class="iconfont icon-guanbi"></i></div>
        </li>
      </ol>
    </div>
    <div class="search_list_copy">
      <div class="list_154_main_list" v-for="(item, index) in songs" @click="play(index)">
        <i class="iconfont index">{{index + 1}}</i>
        <div class="list_sr">
          <div class="songname"> {{ item.artists[0].name}} - {{item.name }} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import swiper from 'components/swiper/swiper';
  import {axios} from '@/router/config';
  const ERR_OK = 200;
  export default {
    data(){
      return {
        keywords: '',
        data1: '',
        songs: '',
      }
    },
    created () {
      /* 获取banner */

    },
    components: {
      'v-swiper': swiper
    },
    methods: {
      hotSearch(){
        const self = this;
        if (self.keywords) {
          setTimeout(() => {
            axios('get', '/search/suggest', {
              keywords: self.keywords
            }, (response) => {
              if (response.code === ERR_OK) {
                self.data1 = response.result;
              }
            });
          }, 500)
        } else {
          self.data1 = '';
        }
      },
      searchSong(v){
        const self = this;
        axios('get', '/search', {
          keywords: v
        }, (response) => {
          if (response.code === ERR_OK) {
           self.songs = response.result.songs
          }
        });
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .station
    width 100%
    height auto
    overflow hidden
    position relative
    .search
      width 100%
      box-sizing border-box
      padding 15px 10px
      border-bottom 1px solid #ebecec
      .search_style
        width 100%
        height 30px
        background #ebecec
        border-radius 30px
        font-size 14px
        display flex
        flex-flow row
        justify-content center
        align-items center
        i
          flex 0 0 26px
          color #c9c9c9
          font-size 14px
          text-align center
          vertical-align middle
        input
          width 100%
          height 30px
          border 0
          outline none
          box-sizing border-box
          padding-left 5px
          flex 0 0 1
          background transparent
    .com_list
      width 100%
      padding 0 15px
      h3
        height 50px
        line-height 50px
        border-bottom 1px solid #ebecec
        color #507daf
        font-size 15px
      ol
        width 100%
        li
          width 100%
          height 45px
          line-height 45px
          list-style none
          display flex
          flex-flow row
          i
            flex 0 0 10px
            padding-right 10px
            font-size 15px
            color #b2b3b3
            vertical-align middle
          .searchname
            width 100%
            flex 1
            border-bottom 1px solid #ebecec
            .icon-guanbi
              display inline-block
              width 40px
              float right
              text-align center
    .search_list_copy
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

</style>
