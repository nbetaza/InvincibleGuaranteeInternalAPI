<template>
  <div style="padding:2px">
    <q-btn-dropdown
    outline
      color="blue-grey-6"
      :label="model.name"
      @click="onMainClick"
    >
      <q-list>
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
             <q-checkbox v-model="item.checked" :label="item.value" color="blue-grey-6"/>
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

        <!-- <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar icon="folder" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Photos</q-item-label>
            <q-item-label caption>February 22, 2016</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="info" color="amber" />
          </q-item-section>
        </q-item>
        -->
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<style>
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
      showCout: 6,
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
      var number = _.filter(me.array, (i) => { return i.checked === true }).length
      if (number !== me.selectedNumber) {
        me.$emit('filterUpdated')
      }
      me.selectedNumber = number
      return number
    }
  },
  updated () {
  },
  methods: {
    setAllCheck (val) {
      var me = this
      _.each(me.array, (i) => { i.checked = val })
    },
    filterChanged (item) {
    },
    onMainClick () {
    },
    onItemClick () {
    }
  }
}
</script>
