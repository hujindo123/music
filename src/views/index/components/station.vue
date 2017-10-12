<template>
  <div class="station">
    <v-swiper :banner="banner" :isBanner="IsBanner" class="swipers"></v-swiper>
    <div class="station-nav">
      <a href="">
        <img src="../../../../static/img/type.png" alt="" class="bs">
        电台分类
      </a>
      <a href="">
        <img src="../../../../static/img/paihang.png" alt="" class="bs">
        电台排行
      </a>
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
        banner: {}, // banner
        IsBanner: true
      }
    },
    created () {
      /* 获取banner */
      axios('get', '/banner', {}, (response) => {
        if (response.code === ERR_OK) {
          /*    setTimeout(() => {
           this.loading.load = false;
           }, 500);*/
          this.banner = response;
          console.log(this.banner);
        }
      });
    },
    components: {
      'v-swiper': swiper
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .station
    width 100%
    height auto
    padding-top 84px
    overflow hidden
    position relative
    .station-nav
      padding 11px 0
      display flex
      flex 1
      border-bottom 1px solid #e2e3e4
      a
        width 50%
        height 30px
        text-align center
        line-height 30px
        color #323233
      a:first-child
        border-right 1px solid #e2e3e4
      .bs
        width 30px
        height 28px
        display inline-block
        vertical-align middle
        margin-right 15px


</style>
