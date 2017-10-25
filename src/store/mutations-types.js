/**
 * Created by Administrator on 2017/6/16.
 */
/*
 * 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。
 * 这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
 * */
export const PLAY_PAGE = 'PLAY_PAGE'; //播放页面
export const GET_SONG_LIST = 'GET_SONG_LIST';// 播放列表
export const LOCKED = 'LOCKED'; //播放开关状态
export const PLAY_INDEX_ID = 'PLAY_INDEX_ID';// 播放序列id
export const GET_RUN_TIME ='GET_RUN_TIME'; //运行时间
export  const SET_RUN_TIME ='SET_RUN_TIME';

