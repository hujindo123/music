<template>
  <div class="list" style="margin-top: 0">
    <ul class="list-data" style="margin-top: 0" v-if="playlist">
      <template v-for="(item, index) in playlist">
        <li class="type-5">
          <div style="position: relative">
            <img :src="item.coverImgUrl" alt="">
            <div class="list-nickname"><i class="icon-user" style="font-weight: bold"></i> {{item.creator.nickname}}</div>
          </div>
          <p class="titles title_no">{{item.name}}</p>
          <span class="type-5-span">
            <i
              class="icon-erji"></i> {{(parseInt(item.playCount) / 10000 < 10) ? item.playCount : (item.playCount / 10000).toFixed(0) + '万'}}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      playlist: {
        type: Array,
        default() {
          return []
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .list
    width 100%
    position relative
    font-size 0
    .list-data
      width 100%
      display flex
      flex-wrap wrap
      justify-content space-between
      .type-5
        width 49.6%
        font-size 12px
        img
          width 100%
        .list-nickname
          position absolute
          bottom 5px
          left 5px
          color: #fff;
          font-size: 12px;
        .title_no
          white-space normal
          line-height 1.3
</style>
