<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import "../static/css/reset.css";

  #app {
    width: 100%;
    height: 100%;
    font-family: Helvetica, 'Avenir',  Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #323233;

  }
</style>
