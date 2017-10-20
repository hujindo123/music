import home from '../views/index/index';
import recommend from '../views/index/components/recommend';
import listsong from  '../views/index/components/listsong';
import station from '../views/index/components/station';
import ranking from '../views/index/components/ranking';
import play from '../../src/components/play/play.vue';

import songList from '../views/songsList/index';
export default [
  {
    path: '/',
    component: home,
    redirect: '/recommend', // 默认子组件
    children: [
      {
        path: '/recommend', // 个性推荐
        component: recommend,
      },
      {
        path: '/listsong', // 歌单
        component: listsong
      },
      {
        path: '/station', // 主播电台
        component: station
      },
      {
        path: '/ranking', // 排行榜
        component: ranking
      }
    ]
  },
  {
    path: '/songList/:id',
    component: songList,
    meta: {
      unkeepAlive: true //不需要缓存
    }
  },
  {
    path: '/play/:id',
    component: play
  }

]
