<template>
  <div class="q-px-lg q-pb-md" style="height:100vh">
    <logicwizard ref="logicwizard"/>
     <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn v-if="guarantee && guarantee.canGetBack" round color="yellow-12" text-color="black" icon="arrow_back" @click="back"/>
      <span v-if="getDebug() ==='true'" style="color:#e0e0e0" @click="back">  back debug</span>
    </q-page-sticky>
    <div class="i-address-title"> <span>updates on new watch</span></div>
    <div class="i-enjoy-cintainer">
      <div class="i-enjoy-row" v-if="guarantee">
        <div class="i-enjoy-col" style="width:85%;align-items:center">
            <q-img
              :src="getItemImageUrl(guarantee.selectedModelID)"
              :ratio="1/4"
              spinner-color="grey-5"
              style="max-width: 100px; height: 130px;"
            />
        </div>
        <div class="i-enjoy-col">
            <div class="i-enjoy-watch-name">  {{guarantee.selectedModelName}}</div>

            <div class=""><span class="i-price-label">MODEL:</span> {{guarantee.selectedModelID}}</div>
            <div v-if="guarantee" class="q-mt-lg i-enjoy-statuses">
              <b>Status</b> <q-icon size="lg" name="loop" style="cursor:pointer" @click="updateStatus"/>
              <div v-if="!guarantee.outboundTrackingID">
                <q-icon name="update" style="font-size:15x"/> <span class="q-ml-sm">Waiting for shipment</span>
              </div>
              <div v-if="guarantee.outboundTrackingID.length > 0">
                <q-icon name="local_shipping" style="font-size:15x"/> <span class="q-ml-sm">Shipped to customer</span>
              </div>
              <div v-if="guarantee.outboundTrackingID.length > 0" class="q-mt-sm">
                <div>Tracking number </div>
                 <q-icon name="forward" style="font-size:15x"/> <a class="q-ml-sm" :href="'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber='+ guarantee.outboundTrackingID" target="_blank"> {{guarantee.outboundTrackingID}} </a>
              </div>
            </div>
        </div>
      </div>
    </div>
    </div>
</template>

<style>
.i-enjoy-statuses{
  color:#58595B;
}
.i-enjoy-watch-name{
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
}
.i-enjoy-cintainer{
  display: flex;
  flex-direction: column;
}
.i-enjoy-col{
  display:flex;
  flex-direction: column;
  width:100%;
}
.i-enjoy-row{
  padding:10px;
  align-self: center;
  width:60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top:3px solid rgb(255, 242, 0);
   border-bottom:3px solid rgb(255, 242, 0);
}
.i-address-container{
  padding-left:10%;
  padding-right:10%
}
.i-change-input-title{
  font-family: Arimo;
  font-style: normal;
  font-weight: normal;
  line-height: 14px;
  text-transform: uppercase;
  padding-bottom:3px;
  color: #848588;
  font-size: 12px;
  padding-top:10px;
  display: block;
}
.q-field__marginal{
  height: 40px;
}
.i-btn-contact {
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #FFF200;
  text-transform: uppercase;
  font-size: 20px;
  line-height: 30px;
  color: #58595B;
  font-weight: bold;
  height: 40px;
  cursor: pointer;
  font-family: Din;
  margin-top: 20px;
  width:200px;

}
.q-field__control{
  height:40px;
}
.q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
    min-height: 40px;
}
.i-lookup{
  width:100%;
  text-align: center;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #C7C8CA;
  padding: 3px 10px;
  color: #58595B;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}
.i-address-title{
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: black;
  padding: 20px 0px
}
@media only screen and (max-width: 600px) {
.i-enjoy-row{
  width: 100%;
}
}
</style>

<script>
import logicwizard from '../components/LogicWizard'

export default {
  name: 'enjoy',
  components: {
    logicwizard: logicwizard
  },
  data () {
    return {
      guarantee: null
    }
  },
  created: function () {
  },
  mounted () {
    var me = this
    me.$refs.logicwizard.setStepColor(5)
    me.guarantee = me.$refs.logicwizard.checkSession()
  },
  methods: {
    getDebug () {
      return process.env.DEBUG_NAVIGATION
    },
    updateStatus () {
      var me = this
      me.$refs.logicwizard.updateGuarantee(function () {
        me.guarantee = me.$refs.logicwizard.checkSession()
      })
    },
    back () {
      var me = this
      me.$refs.logicwizard.getBackByGuaranteeID()
    },
    next (presenceOrNot) {
    },
    getItemImageUrl (id) {
      return process.env.API + '/images/item/' + id
    }
  }
}
</script>
