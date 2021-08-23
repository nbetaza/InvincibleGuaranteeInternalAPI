<template>
<div class="i-select-main">
  <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn v-if="guarantee && guarantee.canGetBack" round color="yellow-12" text-color="black" icon="arrow_back" @click="back"/>
      <span v-if="getDebug() ==='true'" style="color:#e0e0e0" @click="back">  back debug</span>
    </q-page-sticky>
  <logicwizard ref="logicwizard"/>
  <div class="i-filters">
    <smartFilter @filterUpdated="filterUpdated" :model="filters.gender"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.price"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.productCollection"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.caseSizeRange"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.bandMaterial"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.functionType"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.caseTone"/>
    <!-- <smartFilter @filterUpdated="filterUpdated" :model="filters.caseMaterial"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.crownType"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.crystalType"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.dialMaterial"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.movementCaliber"/>
    <smartFilter @filterUpdated="filterUpdated" :model="filters.waterResistance"/> -->
  </div>
  <div class="i-selected-filters">

  <span v-for="(filter, index) in filters" :key="index">
    <span v-for="(value, vindex) in filter.values" :key="vindex">
        <q-chip square removable v-model="value.checked" >
        {{value.value}}
        </q-chip>
      </span>
  </span>
</div>
 <div class="i-select-container-body">
       <q-scroll-area  ref="scrollArea" style="height: calc(100vh - 200px);width:100%"  :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle">
        <div v-show="watchArray.length === 0" class="i-loading"> <span>
           <q-spinner
            color="grey-5"
            size="4em"
            :thickness="4"
          /> </span>
        </div>
        <watchlist v-if="guarantee" :guarantee="guarantee" :list="watchArray" ref="wl" @loadNext="loadItemsByFilterAndScroll" @proceed="watchProceed"/>
      </q-scroll-area>
    </div>
</div>

</template>

<style>
.i-loading{
  height: calc(100vh - 200px);
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center
}
.i-filters{
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
}
.i-filters{
  padding:10px;
}
.i-selected-filters{
  padding: 0px 10px;
  justify-content: center;
  display: flex;
  padding-bottom:5px;
}
.i-select-container{
  display: flex;
  flex-direction: row;
  width:100%;
}
.i-select-container-filter{
    display: flex;
  flex-direction: column;
  width:30%

}
.i-select-container-body{
  display: flex;
  flex-direction: row;
      flex-wrap: wrap;
  width:100%

}

@media only screen and (max-width: 600px) {
  .i-watch-list-container{
        width: 160px;
  }
}

</style>

<script>
import itemService from '../app/services/itemservice'
import smartFilter from '../components/SmartFilter'
import watchlist from '../components/watchlist'
import logicwizard from '../components/LogicWizard'

import _ from 'lodash'
export default {
  name: 'SelectWatch',
  components: {
    smartFilter: smartFilter,
    watchlist: watchlist,
    logicwizard: logicwizard
  },
  data () {
    return {
      guarantee: null,
      visible: true,
      watchArray: [],
      currentItemPage: 1,
      returnFilter: {},
      filters: {
        price: {
          name: 'Price',
          values: [{
            value: '$0.00 - $99.99',
            checked: false,
            from: 0,
            to: 99.99
          },
          {
            value: '$100.00 - $299.99',
            checked: false,
            from: 100,
            to: 299.99
          },
          {
            value: '$300.00 - $499.99',
            checked: false,
            from: 300,
            to: 499.99
          },
          {
            value: '$500.00 - $999.99',
            checked: false,
            from: 500,
            to: 999.99
          },
          {
            value: '$1,000.00 - $2,499.99',
            checked: false,
            from: 1000,
            to: 2499.99
          },
          {
            value: '$2,500.00 - $9,999.99',
            checked: false,
            from: 2500,
            to: 9999.99
          }]
        },
        caseSizeRange: {
          name: 'Case Size',
          values: [{
            value: '0 - 30 mm',
            checked: false,
            from: 0,
            to: 30
          },
          {
            value: '30 - 40 mm',
            checked: false,
            from: 30,
            to: 40
          },
          {
            value: '40 - 50 mm',
            checked: false,
            from: 40,
            to: 50
          },
          {
            value: '50 - 70 mm',
            checked: false,
            from: 50,
            to: 70
          }]
        },
        caseSize: {
          name: 'Case Size',
          values: []
        },
        caseTone: {
          name: 'Case Tone',
          values: []
        },
        productCollection: {
          name: 'Collection',
          values: []
        },
        bezelMaterial: {
          name: 'Bezel Material',
          values: []
        },
        bandMaterial: {
          name: 'Band Material',
          values: []
        },
        brand: {
          name: 'Brand',
          values: []
        },
        caseMaterial: {
          name: 'Case Material',
          values: []
        },
        crownType: {
          name: 'Crown Type',
          values: []
        },
        crystalType: {
          name: 'Crystal Type',
          values: []
        },
        dialMaterial: {
          name: 'Dial Material',
          values: []
        },
        functionType: {
          name: 'Movement Type',
          values: []
        },
        gender: {
          name: 'Gender',
          values: []
        },
        movementCaliber: {
          name: 'Movement Caliber',
          values: []
        },
        waterResistance: {
          name: 'Water Resistance',
          values: []
        }
      }
    }
  },
  computed: {
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
  mounted () {
    var me = this
    me.guarantee = me.$refs.logicwizard.checkSession()
    me.$refs.logicwizard.setStepColor(3)
  },
  created: function () {
    var me = this
    itemService.getFilters().then((data) => {
      for (var key in me.filters) {
        me.mapFilter(me.filters[key], key, data)
      }
      me.filterUpdated()
    }, (error) => {
      console.error(error.message)
    }).then(() => {
    })
  },
  updated () {
  },
  methods: {
    getDebug () {
      return process.env.DEBUG_NAVIGATION
    },
    back () {
      var me = this
      me.$refs.logicwizard.getBackByGuaranteeID()
    },
    watchProceed (watch) {
      var me = this
      me.$refs.logicwizard.watchProceed(watch)
    },
    filterUpdated () {
      var me = this
      console.log('filter updated in select watch')
      console.log(me.filters)
      me.returnFilter = {}

      for (var key in me.filters) {
        var filterValues = me.filters[key].values
        var checkedArray = _.filter(filterValues, (i) => { return i.checked === true })
        me.returnFilter[key] = []
        _.each(checkedArray, (a) => {
          me.returnFilter[key].push({
            value: a.value
          })
        })
      }
      me.currentItemPage = 1
      me.watchArray = []
      me.addFilterPrices()
      me.addCaseSizeFilter()

      console.log('RETURN FILTER')
      console.log(me.returnFilter)
      me.loadItemsByFilter()
    },
    addCaseSizeFilter () {
      var me = this
      me.returnFilter.caseSize = []
      _.each(me.filters.caseSize.values, (navValue) => {
        var floatVal = parseFloat(navValue.value)
        _.each(me.filters.caseSizeRange.values, (rangeValue) => {
          if (rangeValue.checked) {
            if (rangeValue.from <= floatVal && rangeValue.to >= floatVal) {
              me.returnFilter.caseSize.push({
                value: navValue.value
              })
            }
          }
        })
      })
    },
    addFilterPrices () {
      var me = this
      if (_.find(me.filters.price.values, { checked: true })) {
        me.returnFilter.price = {
          priceFrom: 10000,
          priceTo: 0
        }
        _.each(me.filters.price.values, (value) => {
          if (value.checked) {
            me.returnFilter.price.priceFrom = Math.min(me.returnFilter.price.priceFrom, value.from)
            me.returnFilter.price.priceTo = Math.max(me.returnFilter.price.priceTo, value.to)
          }
        })
      } else {
        me.returnFilter.price = {
          priceFrom: 0,
          priceTo: 10000
        }
      }
    },
    loadItemsByFilterAndScroll () {
      var me = this
      if (me.currentItemPage === -1 || Object.keys(me.returnFilter).length === 0) {
        return
      }
      me.currentItemPage = me.currentItemPage + 1
      me.loadItemsByFilter()
    },
    loadItemsByFilter () {
      var me = this
      me.returnFilter.page = me.currentItemPage
      itemService.getItemsOnHandFiltered(JSON.stringify(me.returnFilter)).then((data) => {
        if (data.items.length === 0) {
          me.currentItemPage = -1
        }
        _.each(data.items, i => {
          if (i.price > 0) {
            me.watchArray.push(i)
          }
        })
      }, (error) => {
        console.error(error.message)
      }).then(() => {
      })
    },
    mapFilter (filter, name, data) {
      var array = _.filter(data[name], (i) => { return i.value })
      _.each(array, (arrayItem) => {
        filter.values.push({
          value: arrayItem.value,
          checked: false
        })
      })
    }
  }
}
</script>
