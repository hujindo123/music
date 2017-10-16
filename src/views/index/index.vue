<template>
  <div class="all">
    <keep-alive>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </keep-alive>
    <v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
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
      'v-footer': footer
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /* @import "../../assets/css/style.css"*/
  .all
    width 100%
    height 100%
  .slide-fade-enter-active
    transition: all 0.2s ease;

  .slide-fade-leave-active
    transition: all 0.2s ease;
    opacity 1;

  .slide-fade-enter, .slide-fade-leave-to
    opacity 0;
</style>
