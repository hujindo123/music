<template>
  <div class="positionTop">
  <!--  <header class="header-wrapper">
      <div class="header-left"><i class="iconfont icon-huatong"></i></div>
      <div class="header-middle"><i class="icon-search"></i>搜索音乐、歌词、电台</div>
      <div class="header-right"><i class="iconfont icon-state"></i></div>
    </header>-->
    <div class="nav">
      <div class="nav-title">
        <router-link to="/recommend"><span>推荐音乐</span></router-link>
      </div>
      <div class="nav-title">
        <router-link to="/listsong"><span>热歌榜</span></router-link>
      </div>
      <div class="nav-title">
        <router-link to="/station"><span>搜索</span></router-link>
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
    flex 0 0 40px
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
      box-sizing border-box
      background rgba(255, 255, 255, 0.95)
      a
        flex 1
        height 40px
        line-height 40px
        text-align center
        &.router-link-exact-active
          span
            position relative
            display block
            &:after
              content ''
              position absolute
              bottom 0
              left 0
              width 100%
              border-bottom: 3px solid red;
        .nav-title
          display block
          color #333
          span
            display inline-block
            line-height 40px

</style>
