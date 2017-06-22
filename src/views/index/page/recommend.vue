<template>
  <div class="recommend">
    <pulse-loader :loading="loading.load" :color="loading.color" :size="loading.size" :margin="loading.margin"
                  :radius="loading.radius" class="loading" v-show="loading.load"></pulse-loader>
    <span v-if="!loading.load">
      <v-swiper :banner="banner" :isBanner="IsBanner" class="swipers"></v-swiper>
      <ul class="recommend-nav">
        <li>
          <div class="i"><i class="icon-fm"></i></div>
          <p>私人FM</p>
        </li>
        <li>
          <div class="i"><i class="icon-date"></i><span>15</span></div>
          <p>每日推荐歌曲</p>
        </li>
        <li>
          <div class="i"><i class="icon-up"></i></div>
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
  import PulseLoader from 'vue-spinner/src/BeatLoader.vue';
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
  const ERR_OK = 200;
  export default {
    data() {
      return {
        loading: {
          color: "#f63",
          size: '10  px',
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
      this.$axios.get('/api/banner').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          setTimeout(() => {
            this.loading.load = false;
          }, 500);
          this.banner = response;
        }
      });
      /* 获取推荐歌单 */
      this.$axios.get('/api/personalized').then((response) => {  /* */
        response = response.data;
        if (response.code === ERR_OK) {
          this.recommend = response.result;
        }
      });
      /* 独家放送 */
      this.$axios.get('/api/personalized/privatecontent').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.privatecontent = response.result.reverse();
        }
      });
      /* 最新音乐 */
      this.$axios.get('/api/personalized/newsong').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.newsong = response.result;
        }
      });
      /* 推荐MV */
      this.$axios.get('/api/personalized/mv').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.mv = response.result;
        }
      });
      /* 精选电台 */
      this.$axios.get('/api/dj/recommend').then((response) => {
        response = response.data;
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
      'v-swiper': swiper,
      'v-list': list,
      'pulse-loader': PulseLoader,
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .recommend
    width 100%
    height auto
    margin-bottom 49px
    overflow hidden
    position relative
    .swipers
      position relative
      .swiper-wrapper
        overflow hidden !important
        position relative !important
    .loading
      text-align center
      margin-top 60px
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
          line-height 52px
          box-sizing border-box
          border 1px solid #d33a31
          color #d33a31
          margin: 0 auto;
          span
            width 47px
            font-size 12px
            display block
            line-height 55px
            position absolute
            top 0
        p
          font-size 12px
          line-height 1
          margin-top 9px
          color #323233
</style>
