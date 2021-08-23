<template>
  <div style="padding:2px">
{{selectedCount}}
     <q-scroll-area  style="height: 250px;" v-show="showAll === true">
        <div v-for="(item, idx) in array" :key="idx" v-show="idx < showCout || showAll">
          <q-checkbox v-model="item.checked" :label="item.value"/>
        </div>
      </q-scroll-area>

      <div v-for="(item, idx) in array" :key="idx" v-show="idx < showCout && showAll === false">
          <q-checkbox v-model="item.checked" :label="item.value"/>
        </div>

      <div clickable @click="showAll = true" v-show="showAll === false && array.length > showCout">
        View {{array.length - showCout}} more
      </div>
      <div clickable @click="showAll = false" v-show="showAll === true">
        Show {{showCout}} only
      </div>
     <!-- <q-list>
        <q-item clickable @click="setAllCheck(true)" v-show="selectedCount !== array.length">
          <q-item-section>
            <q-item-label>{{selectedCount}} Selected</q-item-label>
          </q-item-section>
            <q-item-section side>Select all
          </q-item-section>
        </q-item>
         <q-item clickable @click="setAllCheck(false)" v-show="selectedCount === array.length">
          <q-item-section>
            <q-item-label>{{selectedCount}} Selected</q-item-label>
          </q-item-section>
            <q-item-section side>Deselect all
          </q-item-section>
        </q-item>
<q-separator spaced inset />

        <q-item v-for="(item, idx) in array" :key="idx" v-show="idx < showCout || showAll">
          <q-item-section>
             <q-scroll-area  class="i-term-scroll" ref="scrollArea" :thumb-style="thumbStyle"
              :content-style="contentStyle"
              :content-active-style="contentActiveStyle">
             <q-checkbox v-model="item.checked" :label="item.value"/>
               </q-scroll-area>

          </q-item-section>
        </q-item>

<q-separator spaced inset v-show="array.length > showCout"/>
         <q-item clickable @click="showAll = true" v-show="showAll === false && array.length > showCout">
          <q-item-section>
            <q-item-label>View {{array.length - showCout}} more</q-item-label>
          </q-item-section>
        </q-item>
         <q-item clickable @click="showAll = false" v-show="showAll === true">
          <q-item-section>
            <q-item-label>Show {{showCout}} only</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>-->
  </div>
</template>

<style>
.i-term-scroll{

}
</style>

<script>
import _ from 'lodash'

export default {
  name: 'SmartFilter',
  components: {
  },
  props: ['model'],
  data () {
    return {
      contact: {
        id: ''
      },
      teal: '',
      array: [],
      showAll: false,
      showCout: 5,
      selectedNumber: 0
    }
  },
  created: function () {
    var me = this
    me.array = me.model.values
  },
  computed: {
    selectedCount: function () {
      var me = this
      console.log('selected count')
      var number = _.filter(me.array, (i) => { return i.checked === true }).length
      if (number !== me.selectedNumber) {
        me.$emit('filterUpdated')
      }
      me.selectedNumber = number
      return number
    },
    contentStyle () {
      return {
      }
    },
    contentActiveStyle () {
      return {
      }
    },
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#58595B',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  updated () {
    var me = this
    console.log('updated')
    console.log(me.array)
  },
  methods: {
    setAllCheck (val) {
      var me = this
      _.each(me.array, (i) => { i.checked = val })
      console.log('selec all clicked')
    },
    filterChanged (item) {
      console.log(item)
    },
    onMainClick () {
      // console.log('Clicked on main button')
    },
    onItemClick () {
      // console.log('Clicked on an Item')
    }
  }
}
</script>
