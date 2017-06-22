<template>
  <div class="all">
     <div class="positionTop">
       <header class="header-wrapper">
         <div class="header-left"><i class="icon-mike"></i></div>
         <div class="header-middle"><i class="icon-search"></i>搜索音乐、歌词、电台</div>
         <div class="header-right"><i class="icon-state"></i></div>
       </header>
       <div class="nav" ref="hookRun">
         <div class="nav-title" :class="{'active': active == 0}"><span @click="choiceNav(0,$event)">个性推荐</span></div>
         <div class="nav-title" :class="{'active': active == 1}"><span @click="choiceNav(1,$event)">歌单</span></div>
         <div class="nav-title" :class="{'active': active == 2}"><span @click="choiceNav(2,$event)">主播电台</span></div>
         <div class="nav-title" :class="{'active': active == 3}"><span @click="choiceNav(3,$event)">排行榜</span></div>
         <div class="run-li" :style="runLink"></div>
       </div>
     </div>
    <scroller>
      <div class="content_main">
        <swiper :options="swiperOption" ref="swiper" class="swiperOption">
          <swiper-slide class="swiper-slide">
            <recommend></recommend>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <listsong></listsong>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <station></station>
          </swiper-slide>
          <swiper-slide class="swiper-slide">
            <ranking></ranking>
          </swiper-slide>
        </swiper>

      </div>
    </scroller>

    <v-footer></v-footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import recommend from './page/recommend';
  import listsong from './page/listsong';
  import station from './page/station';
  import ranking from './page/ranking';
  import footer from 'components/footer/footer';
  import* as service from '../../service';
  export default {
    data() {
      return {
        active: 0,
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 0,
          activeIndex: 0,
          direction: 'horizontal',
          // grabCursor: true, 设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
          // setWrapperSize: true, Swiper从3.0开始使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
          autoHeight: false, // 高度随内容变化
          // pagination: '.swiper-pagination',
          paginationClickable: true,
          observeParents: true,
          resistanceRatio: 0,
          // loop: false, // 让Swiper看起来是循环的。
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          // more Swiper configs and callbacks...
          // ...
          onSlideChangeStart: ({activeIndex}) => {
            this.choiceNav(activeIndex);

          }
        }
      };
    },
    mounted(){
      let rootElement = this.$refs.hookRun;
      rootElement.querySelector('.run-li').style.width = rootElement.getElementsByClassName('nav-title')[0].firstChild.clientWidth + 'px';
      rootElement.querySelector('.run-li').style.left = (rootElement.getElementsByClassName('nav-title')[0].clientWidth - rootElement.getElementsByClassName('nav-title')[0].firstChild.clientWidth) / 2 + 'px';
    },
    methods: {
      /* 顶部导航切换 */
      choiceNav($index, event) {
        let rootElement = this.$refs.hookRun; // 点击导航元素
        this.swiper.slideTo($index, 500, false); //切换页面
        let thisWidth = parseInt(rootElement.getElementsByClassName('nav-title')[$index].clientWidth); // 当前div的宽度
        let thisChildWidth = rootElement.getElementsByClassName('nav-title')[$index].firstChild.clientWidth; // 当前div子元素的宽度
        let clientLeft = parseInt(rootElement.getElementsByClassName('nav-title')[$index].clientWidth) * $index; // 距离左边的距离
        let offsetLeft = (thisWidth - thisChildWidth) / 2; // 子元素居中
        rootElement.querySelector('.run-li').style.left = clientLeft + offsetLeft + 'px'; // 滑动的距离
        rootElement.querySelector('.run-li').style.width = thisChildWidth + 'px';
        this.active = $index;
      },
    },
    computed: {
      runLink() {
        left:  '100px';
      },
      swiper(){
        return this.$refs.swiper.swiper
      }
    },
    components: {
      swiper,
      swiperSlide,
      recommend,
      station,
      listsong,
      ranking,
      'v-footer': footer
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/css/style.css"
  .all
    width 100%
    height 100%
    overflow hidden
    display flex
    flex-flow column
    .positionTop
      width: 100%;
      height: 84px;
      flex 0 0 84px
      position: absolute;
      z-index 2000
      .header-wrapper
        width 100%
        padding 7px 0
        background #d43c33
        display flex
        position relative
        .header-left, .header-right
          width 54px
          height 30px
          line-height 30px
          font-size 26px
          vertical-align bottom
          color #fff
          box-sizing border-box
          flex 0 0 54px
          text-align center
        .header-left
          padding-right 5px
        .header-middle
          width 100%
          height 30px
          line-height 30px
          flex 1
          border-radius 15px
          background #fff
          padding-left 17px
          color #d1d1d1
          font-size 14px
          .icon-search
            padding-right 10px
            display inline-block
            line-height 30px
        .header-right
          padding-left 5px
      .nav
        width 100%
        display flex
        position relative
        overflow hidden
        height 40px
        background rgba(255, 255, 255, 0.95)
        .nav-title
          flex 1
          height 40px
          line-height 40px
          text-align center
          &.active
            color #d43c33
          span
            height 40px
            padding 0 4px
            box-sizing border-box
            display inline-block
            &.active
              border-bottom 2px solid #d43c33
        .run-li
          height: 2px
          background: #d43c33
          position: absolute
          bottom: 0
          transition all 0.3s ease
    .content_main
      display flex
      flex 1
      padding-top 84px
      box-sizing border-box
      width 100%
      flex-flow: row


</style>
