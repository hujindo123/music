<template>
  <div class="footer">
    <router-link class=" router-link-exact-active footer-li" to="/">
      <i class="iconfont icon-wangyiyunyinlezizhi-copy"></i>
      <span>发现音乐</span>
    </router-link>
    <router-link class="footer-li" to="/myselfMusic">
      <i class="iconfont icon-yinle"></i>
      <span>我的音乐</span>
    </router-link>
    <router-link class="footer-li" to="/friend">
      <i class="iconfont icon-19"></i>
      <span>朋友</span>
    </router-link>
    <router-link class="footer-li" to="/user">
      <i class="iconfont icon-zhanghao"></i>
      <span>账号</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .footer
    width 100%
    height 49px
    display flex
    z-index 1000
    position fixed
    left 0
    bottom 0
    background #363737
    .footer-li
      flex 1
      font-size 11px
      text-align center
      &.router-link-exact-active
        color #fff
        i
          font-weight 700
      i
        display block
        margin 5px 0 5px 0
        font-size 21px
        &.icon-19
          margin-top 2px
          font-size 24px

</style>
