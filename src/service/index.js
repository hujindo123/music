/**
 * Created by Administrator on 2017/6/21.
 */

export const topList = () => {
  this.$axios.get('/api/top/playlist').then((response) => {
    response = response.data;
  })
}
