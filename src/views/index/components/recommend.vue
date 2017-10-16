<template>
  <div>
    <pulse-loader :loading="loading.load" :color="loading.color" :size="loading.size" :margin="loading.margin"
                  :radius="loading.radius" class="loading" v-show="loading.load"></pulse-loader>
    <span v-if="!loading.load" class="recommend_wrapper">
      <v-header></v-header>
      <v-swiper :banner="banner" :isBanner="IsBanner"></v-swiper>
      <ul class="recommend-nav">
        <li>
          <div class="i"><i class="iconfont icon-shouyinji"></i></div>
          <p>私人FM</p>
        </li>
        <li>
          <div class="i"><i class="iconfont icon-rili"></i><span>15</span></div>
          <p>每日推荐歌曲</p>
        </li>
        <li>
          <div class="i"><i class="iconfont icon-gupiao"></i></div>
          <p>云音乐热歌榜</p>
        </li>
      </ul>
      <v-list :recommend="recommend" :title="'推荐歌单'"></v-list>
      <v-list :recommend="privatecontent" :title="'独家放送'"></v-list>
      <v-list :recommend="newsong.slice(0,6)" :title="'最新音乐'"></v-list>
      <v-list :recommend="mv" :title="'推荐MV'"></v-list>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  import swiper from 'components/swiper/swiper';
  import list from 'components/list/list';
  import header from 'components/header/header';
  import PulseLoader from 'vue-spinner/src/BeatLoader.vue';
  import {axios} from '@/router/config';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  const ERR_OK = 200;
  export default {
    data() {
      return {
        loading: {
          color: "#f63",
          size: '10px',
          margin: '3px',
          radius: '50%',
          load: true
        },
        banner: {}, // banner
        recommend: [], // 推荐歌单
        privatecontent: [], // 独家放送
        newsong: [], // 最新音乐
        mv: [], // 最新MV
        djRadios: [], // 最新电台
        IsBanner: true,
        title: '',
        focus: false,
        left: 0,
      };
    },
    created() {
      /* 获取banner */
      axios('get', '/banner', {}, (response) => {
        if (response.code === ERR_OK) {
          setTimeout(() => {
            this.loading.load = false;
          }, 500);
          this.banner = response;
        }
      });
      /* 获取推荐歌单 */
      axios('get', '/personalized', {}, (response) => {
        if (response.code === ERR_OK) {
          this.recommend = response.result;
        }
      });
      /* 独家放送 */
      axios('get', 'personalized/privatecontent', {}, (response) => {
        if (response.code === ERR_OK) {
          this.privatecontent = response.result.reverse();
          console.log(this.privatecontent);
        }
      });
      /* 最新音乐 */
      axios('get', 'personalized/newsong', {}, (response) => {
        if (response.code === ERR_OK) {
          this.newsong = response.result;
        }
      });
      /* 推荐MV */
      axios('get', 'personalized/mv', {}, (response) => {
        if (response.code === ERR_OK) {
          this.mv = response.result;
        }
      });
      /* 精选电台 */
      axios('get', 'dj/recommend', {}, (response) => {
        if (response.code === ERR_OK) {
          this.djRadios = response.djRadios;
        }
      });
    },
    methods: {
      add_score() {
        this.ADD_CART()
      },
      /*...mapMutations([
       'ADD_CART' // this.$store.commit('ADD_CART')
       ]),*/
      ...mapActions([
        'ADD_CART' // this.$store.dispatch('ADD_CART')
      ])
    },
    computed: {
      runLink() {
        left:  '100px';
      },

      ...mapGetters({
        greater: 'score'
      }),
      ...mapState({
        num: 'score'
      })
    },
    components: {
      'v-header': header,
      'v-swiper': swiper,
      'v-list': list,
      'pulse-loader': PulseLoader,
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loading
    text-align center
    margin-top 60px
  .recommend_wrapper
    width 100%
    padding-top 84px
    padding-bottom 30px
    display inline-block
    .recommend-nav
      height 100px
      display flex
      background-image url(require('../../assets/image/repeat-x.png'))
      background-repeat repeat-x
      background-position left bottom
      background-size auto 1px
      justify-content space-around
      li
        position relative
        flex 1
        margin-top 15px
        text-align center
        font-size 0
        .i
          height 50px
          width 50px
          font-size 27px
          border-radius 50%
          line-height 48px
          box-sizing border-box
          border 1px solid #d33a31
          color #d33a31
          margin: 0 auto;
          span
            width 47px
            font-size 12px
            display block
            line-height 58px
            position absolute
            top 0
        p
          font-size 12px
          line-height 1
          margin-top 9px
          color #323233

</style>
