<template>
  <div id="allmap" v-bind:style="mapStyle"></div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: function () {
      return {
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px'
        }
      }
    },
    props: {
      // 地图在该视图上的高度
      mapHeight: {
        type: Number,
        default: 500
      },
      // 经度
      longitude: {
        type: Number,
        default: 116.404
      },
      // 纬度
      latitude: {
        type: Number,
        default: 39.915
      },
      // 描述
      description: {
        type: String,
        default: '天安门'
      }
    },
    mounted(){
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(this.longitude, this.latitude);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      map.centerAndZoom(point, 15);
      // 信息窗口的配置信息
      var opts = {
        width: 250,
        height: 35,
        title: '地址'
      };
      // 创建信息窗口对象
      var infoWindow = new BMap.InfoWindow(this.description, opts);
      marker.addEventListener("click", function () {
        map.openInfoWindow(infoWindow, point);
      });
      map.enableScrollWheelZoom(true);
      map.openInfoWindow(infoWindow, point);//开启信息窗口
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
