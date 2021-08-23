<template>

<div class="i-watch-list" ref="watchListRef">
  <watch :guarantee="guarantee" :item="selectedWatch" :open="watchDialog" @close="watchDialog = false"  @proceed="$emit('proceed', selectedWatch)"/>
      <q-scroll-observer @scroll="scrollHandler" />

  <div class="i-watch-list-container" v-for="(watch, idx) in list" :key="idx">
    <div class="i-watch-list-container-img">
      <q-img @click="openWatch(watch)"
      :src="getItemImageUrl(watch.no)"
      :ratio="1"
      spinner-color="grey-5"
      style="max-width: 150px; height: 200px;"
    />
    </div>
    <div class="i-watch-price">
      <span v-if="watch.originalPrice" style="text-decoration:line-through"> ${{watch.originalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}}</span>
      <div style="color:#CD3041">${{watch.price.toLocaleString(undefined, {minimumFractionDigits: 2})}} </div>

    </div>
    <div class="i-watch-list-container-descr">
      {{watch.description}}
    </div>
    <div class="i-watch-no">
     model {{watch.no}}
    </div>
  </div>
</div>

</template>

<style>
.i-watch-no{
font-family: RobotoRegular;
  font-style: normal;
font-weight: 300;
  font-size: 10px;
line-height: 12px;
text-transform: uppercase;
  color: #58595B;
  padding-top:5px;
}
.i-watch-price{
  font-family: RobotoRegular;
  font-style: normal;
font-weight: 300;
font-size: 21px;
line-height: 28px;
text-transform: uppercase;
  color: #58595B;
}
.i-watch-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.i-watch-list-container {
  width:180px;
  height:330px;
  border: 1px solid #D5D6D7;
  display:flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
.i-watch-list-container:hover{
  outline: 4px solid #FFF200;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.i-watch-list-container-img{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.i-watch-list-container-descr{
  font-family: RobotoRegular;
  margin-top:10px;
  padding-right:10px;
  color:black;
  font-weight: bold;
  font-size: 10px;
line-height: 12px;
  text-transform: uppercase;
}
</style>

<script>
import watch from '../components/watch'

export default {
  name: 'WatchList',
  components: {
    watch: watch
  },
  props: ['list', 'guarantee'],
  data () {
    return {
      selectedWatch: null,
      watchDialog: false,
      previousPer: 0
    }
  },
  created: function () {
  },
  methods: {
    scrollHandler (data) {
      var me = this
      if (data.direction !== 'down') {
        return
      }
      var percent = (data.position + window.innerHeight) / me.$refs.watchListRef.offsetHeight
      if (percent > 1) {
        if (me.stop) {
          return
        }
        me.$emit('loadNext')
        me.stop = true
        setTimeout(function () {
          me.stop = false
        }, 400)
      }
    },
    openWatch (item) {
      var me = this
      me.selectedWatch = item
      me.watchDialog = true
    },
    getItemImageUrl (id) {
      return process.env.API + '/images/item/' + id
    }
  }
}
</script>
