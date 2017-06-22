<template>
  <div>
    <div class="listsong_title">
      <div class="list_pic">
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {}
    },
    created(){
     /* this.$axios.get('/api/top/playlist').then((response) => {
        response = response.data;
      })*/
    },
    methods:{

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .listsong_title
    width 100%
    height 175px
    box-sizing border-box
    padding 15px 10px 10px 10px
    display flex
    .list_pic
      width 100px
      height 100px
      flex 0 0 100px
      overflow hidden
      img
        display block
        width 100%
</style>
