<template>
  <div>
    <div class="listsong_title" v-if="highquality.length > 0">
      <div class="list_pic">
        <img :src="highquality[0].coverImgUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 200;
  export default {
    data(){
      return {
        highquality: [''],
        a: ''
      }
    },
    created(){
      /* 精品歌单头部 */
      this.$axios.get('/api/top/playlist/highquality').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.highquality = response.playlists;
          console.log(this.highquality)
        }
      })
      /* this.$axios.get('/api/top/playlist').then((response) => {
       response = response.data;
       })*/
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .listsong_title
    width 100%
    box-sizing border-box
    padding 15px 10px 10px 10px
    display flex
    background red
    .list_pic
      width 100px
      height 100px
      flex 0 0 100px
      overflow hidden
      img
        display block
        width 100%
</style>
