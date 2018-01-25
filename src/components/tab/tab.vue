<template>
  <div class="tab">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@/common/stylus/mixin';
  .tab {
    width 100%;
    display flex
    flex-flow row
    position relative
    border-bottom 1px solid #e2e3e4
  }
</style>
