<template>
  <div class="footer">
    <router-link class=" router-link-exact-active footer-li" to="/">
      <i class="icon-findMusic"></i>
      <span>发现音乐</span>
    </router-link>
    <router-link class="footer-li" to="/myselfMusic">
      <i class="icon-myselfMusic"></i>
      <span>我的音乐</span>
    </router-link>
    <router-link class="footer-li" to="/friend">
      <i class="icon-friend"></i>
      <span>朋友</span>
    </router-link>
    <router-link class="footer-li" to="/user">
      <i class="icon-user"></i>
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
        margin 5px 0 4px 0
        font-size 24px

</style>
