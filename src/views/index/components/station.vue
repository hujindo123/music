<template>
  <div class="station">
    <div class="search">
      <div class="search_style">
        <i class="iconfont icon-sousuo_sousuo"></i>
        <input type="search" v-model="keywords" @keyup="hotSearch" placeholder="搜索歌曲、歌手、专辑">
      </div>
    </div>
    <!--搜索到的-->
    <div class="com_list" v-if="data1.artists && !songs">
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
    <!-- 缓存 -->
    <div class="com_list" v-if="!data1 && !songs && local">
      <ol>
        <li v-for="(item, index) in local" v-if="item" @click="searchSong(item)">
          <i class="iconfont icon-time"></i>
          <div class="searchname">{{item}}<i class="iconfont icon-guanbi" @click.stop="deleteItem(index)"></i></div>
        </li>
      </ol>
    </div>
    <!-- 搜索列表-->
    <div class="search_list_copy" v-if="songs.length>0">
      <div class="list_154_main_list" v-for="(item, index) in songs" @click="play(index)">
        <i class="iconfont index">{{index + 1}}</i>
        <div class="list_sr">
          <div class="songname"> {{ item.artists[0].name}} - {{item.name }} </div>
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
  import swiper from 'components/swiper/swiper';
  import {axios} from '@/router/config';
  import play from '@/components/play/play'
  import playFooter from '@/components/footer/playFooter';
  const driver = new Driver();
  const ERR_OK = 200;
  export default {
    data(){
      return {
        keywords: '',
        data1: '',
        songs: '',
        local: [],
        footerPlayShow: false,
        playlist: '',
        runTime: ''
      }
    },
    created () {
        debugger;
      /* 获取banner */
      this.getLocal();
    },
    components: {
      play,
      'playFooter': playFooter
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
          self.songs = '';
        }
      },
      searchSong(v){
        const self = this;
        self.keywords = v;
        if (v) {
          self.getLocal(v);
        }
        axios('get', '/search', {
          keywords: v
        }, (response) => {
          if (response.code === ERR_OK) {
            self.songs = response.result.songs;
            self.$store.dispatch('GET_SONG_LIST_SEARCH', {list: self.songs});
          }
        });
      },
      deleteItem(idx){
        var list = localStorage.getItem('list').split(',');
        list.splice(idx, 1);
        this.local = list;
        localStorage.setItem('list', list);
      },
      getLocal(v){
        var set = new Set([]);
        var list = [];
        if (localStorage.getItem('list') || v) {
          if (!localStorage.getItem('list') && v) {
            localStorage.setItem('list', v);
            list = localStorage.getItem('list').split(',')
          } else if (localStorage.getItem('list') && v) {
            list = localStorage.getItem('list').split(',');
            list.push(v);
          } else if (localStorage.getItem('list') && !v) {
            list = localStorage.getItem('list').split(',');
          }
          list.map(x => set.add(x));
          localStorage.setItem('list', Array.from(set));
          this.local = localStorage.getItem('list').split(',')
        }
      },
      play (index) {
        this.footerPlayShow = true;
        if (index < 0 || index > this.$store.state.playAction.songList.length) {
          index = this.$store.state.playAction.playNum;
        }
        this.$store.commit('PLAY_INDEX_ID_SEARCH', {index: index});
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
        this.play(this.$store.state.playAction.playNum + 1);
      },
      pre(){
        this.play(this.$store.state.playAction.playNum - 1);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .station
    width 100%
    height auto
    z-index 3000
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
      box-sizing border-box
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
