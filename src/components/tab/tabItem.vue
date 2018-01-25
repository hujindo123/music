<template>
  <div class="tabItem" @click="onItemClick">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {}
    },
    props: {
      index: {
        type: Number,
        default: 0
      },
      tabItem: {
        type: Array
      }
    },
    methods: {
      onItemClick(index){
        this.$emit('on-Item-click')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~@/common/stylus/mixin';
  .tabItem {
    height 40px;
    flex 1
    display flex
    justify-content center
    align-items center
    sc(15px, #333)
  }
</style>
