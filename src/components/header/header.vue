<template>
  <div class="positionTop">
    <header class="header-wrapper">
      <div class="header-left"><i class="iconfont icon-huatong"></i></div>
      <div class="header-middle"><i class="icon-search"></i>搜索音乐、歌词、电台</div>
      <div class="header-right"><i class="iconfont icon-state"></i></div>
    </header>
    <div class="nav">
      <div class="nav-title">
        <router-link to="/recommend"><span>音乐</span></router-link>
      </div>
      <div class="nav-title">
        <router-link to="/listsong"><span>视频</span></router-link>
      </div>
      <div class="nav-title">
        <router-link to="/station"><span>电台</span></router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .positionTop
    width 100%
    flex 0 0 84px
    z-index 0
    .header-wrapper
      width 100%
      padding 7px 0
      background #d43c33
      display flex
      position relative
      .header-left, .header-right
        width 54px
        height 30px
        line-height 30px
        font-size 26px
        vertical-align bottom
        color #fff
        box-sizing border-box
        flex 0 0 54px
        text-align center
      .header-left
        padding-right 5px
      .header-middle
        width 100%
        height 30px
        line-height 30px
        flex 1
        border-radius 15px
        background #fff
        padding-left 17px
        color #d1d1d1
        font-size 14px
        .icon-search
          padding-right 10px
          display inline-block
          line-height 30px
      .header-right
        padding-left 5px
    .nav
      width 100%
      display flex
      position relative
      overflow hidden
      height 40px
      background rgba(255, 255, 255, 0.95)
      .nav-title
        flex 1
        height 40px
        line-height 40px
        text-align center
        a
          display block
          span
            display inline-block
            line-height 40px
      .run-li
        height: 2px
        background: #d43c33
        position: absolute
        bottom: 0
        transition all 0.3s ease

</style>
