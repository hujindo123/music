<template>
  <div class="list">
    <div class="title">{{title}}<i class="icon-more"></i></div>
    <ul class="list-data" v-if="recommend">
      <template v-for="(item, index) in recommend">
        <!-- 推荐歌单 -->
        <li v-if="title === '推荐歌单'" class='type-0'>
          <router-link :to="'/songList/' + item.id">
            <img :src="item.picUrl" alt="">
            <p class="list-name">{{item.name}}</p>
            <span class="type-0-span"><i
              class="iconfont icon-erji"></i> {{(parseInt(item.playCount) / 10000 < 10) ? item.playCount : (item.playCount / 10000).toFixed(0) + '万'}}</span>
          </router-link>
        </li>
        <!-- 独家放送 -->
        <li v-if="title === '独家放送'" :class="index === 2 ? 'type-21': 'type-24'">
          <img :src="item.picUrl" alt="">
          <p class="list-name">{{item.name}}</p>
          <span class="type-24-span"><i class="iconfont icon-shipin-copy"></i></span>
        </li>
        <!-- 最新音乐 -->
        <li v-if="title === '最新音乐'" :class="[{'type-4': item.type===4}]">
          <img :src="item.song.album.picUrl" alt="">
          <p class="titles">{{item.song.album.name}}</p>
          <div class="list-author">{{item.song.album.artists[0].name}}</div>
        </li>
        <!-- 推荐mv -->
        <li v-if="title ==='推荐MV'" class="type-5">
          <img :src="item.picUrl" alt="">
          <p class="titles">{{item.name}}</p>
          <span class="type-5-span"><i
            class="iconfont icon-shipin-copy"></i> {{(parseInt(item.playCount) / 10000 < 10) ? item.playCount : (item.playCount / 10000).toFixed(0) + '万'}}</span>
          <div class="list-author">{{item.artistName}}</div>
        </li>
      </template>

    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      },
      title: {
        type: String
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list
    width 100%
    margin-top 20px
    position relative
    font-size 0
    .title
      height 18px
      padding-left 10px
      font-size 16px
      border-left 3px solid #d33a31
      color #323233
      i
        font-size 23px
        display inline-block
        margin-top -2px
        color #767676
        vertical-align middle
    .list-data
      width 100%
      display flex
      margin-top 15px
      flex-wrap wrap
      justify-content space-between
      .type-0, .type-4
        width 32.8%
      .type-21
        width 100%
      .type-24, .type-5
        width 49.6%
      .type-4, .type-5
        .titles
          padding 5px 5px 0 5px
          font-size 12px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
        .list-author
          padding 5px 5px 0 5px
          color #848484
          font-size 11px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
      .type-0, .type-21, .type-24, .type-4, .type-5
        flex 0 0 auto
        position relative
        margin-bottom 12px
        display inline-block
        img
          width 100%
        .list-name
          width 100%
          line-height 1.8
          padding 5px
          font-size 12px
          box-sizing border-box
          overflow hidden
          display -webkit-box
          -webkit-line-clamp 2
          -webkit-box-orient vertical
          word-break break-all
        span
          width 100%
          font-size 14px
          color #fff
          position absolute
          top 0
          padding 5px 7px
        .type-0-span
          right 0
          text-align right
          .iconfont
            font-size 16px
        .type-24-span
          width 20px
          left 5px
          border 1px solid #bcbcbc
          background rgba(0, 0, 0, 0.1)
          border-radius 50%
          text-align center
        .type-5-span
          width 100%
          right 7px
          text-align right
          .icon-mv
            font-size 18px
            vertical-align middle
        .type-24-span, .type-5-span
          height 20px
          line-height 20px
          box-sizing border-box
          top 5px
          padding 0
          i
            font-size 14px
            vertical-align top
            color #fff
</style>
