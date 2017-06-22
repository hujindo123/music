<template>
  <div class="">
    <button @click="getSong">搜索</button>
    <ul>
      <li class="ul-li"></li>
    </ul>
    <v-map></v-map>
  </div>
</template>

<script type="text/ecmascript-6">
  import map from 'components/map/map';
  export default {
    data(){
      return {};
    },
    created() {

    },
    props: {},
    components: {
      'v-map': map
    },
    methods: {
      getSong() {
        this.$axios.get('/api/search?keywords=123&limit=10').then((response) => {
          console.log(response.data)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ul-li
    height 40px
    border-bottom 1px solid #ccc
</style>
