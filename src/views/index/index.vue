<template>
  <div class="all">
    <v-header v-if="this.$store.state.HeadersStatus"></v-header>
    <div class="recommend_wrapper">
      <keep-alive>
        <router-view v-if="!$route.meta.unkeepAlive"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.unkeepAlive"></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from 'components/header/header';
  import footer from 'components/footer/footer';
  import * as service from '../../service';
  export default {
    data() {
      return {};
    },
    methods: {
      /* 顶部导航切换 */

    },
    computed: {},
    components: {
      'v-header': header,
      'v-footer': footer
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .all
    width 100%
    height 100%
    position relative
    display flex
    flex-flow column
    .recommend_wrapper
      width 100%
      flex 1
      overflow-y scroll
      -webkit-overflow-scrolling : touch;
      padding-bottom 30px
      display inline-block
</style>
