<template>
  <div class="q-px-lg q-pb-md i-step-1" style="min-height:100vh">
     <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn v-if="guarantee && guarantee.canGetBack" round color="yellow-12" text-color="black" icon="arrow_back" @click="back"/>
      <span v-if="getDebug() ==='true'" style="color:#e0e0e0" @click="back">  back debug</span>
    </q-page-sticky>
    <logicwizard ref="logicwizard"/>
   <q-stepper
      v-model="step"
      vertical
      done-color="yellow-12"
      active-color="grey-4"
      inactive-color="grey-4"
      animated flat
    >
      <q-step
        :name="1"
        title="Enter outgoing address"
        icon="settings"
        :done="step > 1"
      >
      This address will be used for shipping label generation.
      <div class="i-address-step">
        <addressForm @addressSaved="addressSaved"/>
      </div>
      </q-step>

      <q-step
        :name="2"
        title="Print shipping label"
        icon="post_add"
        :done="step > 2"
      >
      Press PROCEED button only after you send the package.
        <div class="i-pdf" v-if="canLoadPDF">
          <pdf :src="getPdf()" :page="1">
            <template slot="loading">
              Loading shipping label ...
            </template>
          </pdf>
        </div>
        <q-stepper-navigation>
          <a :href="getPdf()" target="_blank" v-if="canLoadPDF" download style="text-decoration:none;">
            <q-chip color="green" text-color="white" icon="get_app" square class="i-download-chip">
            DOWNLOAD LABEL
          </q-chip>
          </a>
          <div @click="labelProceed()" class="i-btn-contact">PROCEED</div>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Wating for watch assessment"
        icon="update"
      >
      Thank you for sending us your watch. Once received your watch will be assesed and then notified via e-mail.

        <q-stepper-navigation>
          <div v-if="guarantee" class="i-send-statuses">
              <b>Status</b> <q-icon size="lg" name="loop" style="cursor:pointer" @click="updateStatus"/>
              <div v-if="guarantee.sendingStatus === 'Sent'">
                <q-icon name="mail" style="font-size:15x"/> <span class="q-ml-sm">Sent to Invicta</span>
              </div>
              <div v-if="guarantee.sendingStatus === 'Received'">
                <q-icon name="done" style="font-size:15x"/> <span class="q-ml-sm">Confirmed</span>
              </div>
              <div  v-if="guarantee.sendingStatus === 'Sent'" class="q-mt-sm">
                <div>Tracking number </div>
                 <q-icon name="forward" style="font-size:15x"/> <a class="q-ml-sm" :href="'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber='+ guarantee.inboundTrackingID" target="_blank"> {{guarantee.inboundTrackingID}} </a>
              </div>
            <div v-if="guarantee.sendingStatus === 'Received'" class="q-mt-sm">
            <b>Confirmed balance:</b> $ {{guarantee.confirmedBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}}
          </div>
          <div v-if="guarantee.sendingStatus === 'Received'" @click="next(true)" class="i-btn-contact">PROCEED</div>
         <div v-if="getDebug() ==='true'" @click="next(true)" style="color:#8080802e;cursor:pointer;margin-top:30px"> debug next</div>
          </div>
<!--
          <div v-if="guarantee">
          <b>STATUS:</b> <q-icon size="lg" name="loop" style="cursor:pointer" @click="updateStatus"/>
          <q-chip color="grey-6" text-color="white" icon="mail" v-if="guarantee.sendingStatus === 'Sent'">
            Sent to Invicta
          </q-chip>
          <div v-if="guarantee.sendingStatus === 'Sent'" class="q-mt-sm">
            <b>Tracking number: </b> <a :href="'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber='+ guarantee.inboundTrackingID" target="_blank"> {{guarantee.inboundTrackingID}} </a>
          </div>
          <q-chip v-if="guarantee.sendingStatus === 'Received'" color="green" text-color="white" icon="done">
            Confirmed
          </q-chip>
          <div v-if="guarantee.sendingStatus === 'Received'" class="q-mt-sm">
            <b>Confirmed balance:</b> $ {{guarantee.confirmedBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}}
          </div>
          <div v-if="guarantee.sendingStatus === 'Received'" @click="next(true)" class="i-btn-contact">PROCEED</div>
         <div @click="next(true)" style="color:#8080802e;cursor:pointer;margin-top:30px"> debug next</div>
         </div> -->
        </q-stepper-navigation>

      </q-step>
    </q-stepper>
<!--
    <div v-show="tab==='watch'">
    <div class="i-presence-title"> <span>Send us your watch</span></div>
    <div class="i-presence-row">
      <div class="i-presence-row-left" @click="tab = 'address'">
        <div class="i-presence-line1">
          <div class="i-presence-line-left"><img src="/statics/watch-presence.png"/></div>
          <div class="i-presence-line-right">Return NVICTA PRO DIVER SWISS MOVEMENT QUARTZ WATCH</div>
        </div>
        <div class="i-presence-line2"><span>Send</span></div>
      </div>
      <div class="i-presence-row-right" @click="next(false)">
        <div class="i-presence-line1">
          <div class="i-presence-line-left"><img src="/statics/watch-presence-no.png"/></div>
          <div class="i-presence-line-right">No returns. No packages and NO sendings! Just send me new watch</div>
        </div>
        <div class="i-presence-line2"><span>Skip</span></div>
      </div>
    </div>
    </div>
    <div v-if="tab==='address'">
        <addressForm @addressSaved="addressSaved"/>
        <div class="i-pdf">
         <pdf :src="getPdf()" :page="1">
          <template slot="loading">
            loading content here...
          </template>
        </pdf>
        </div>
        <embed style="width:100%;height:300px;margin-top:30px" :src="pdfdata">
    </div> -->
  </div>
</template>

<style>
.i-send-statuses{
  color:#58595B;
}
.i-address-step{
  padding-top:30px;
  padding-right:20%;
  padding-left:20%
}
.i-download-chip{
  border-radius:0px;
  width:200px;
  justify-content: center;
  height:40px
}
.i-btn-address {
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #e0e0e0;
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
  text-align: center;
}

.i-pdf{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
}
.i-presence-title{
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
.i-presence-line-right{
  padding:5px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  padding-left:10px;
  color: #58595B;
}
.i-presence-line-left img{
  height:70px;
}
.i-presence-line2{
  text-transform: uppercase;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:15px;
  font-family: RobotoBold;
}
.i-presence-line1{
  width:100%;
  height:100px;
  background: white;
  display:flex;
  padding:5px;
}
.i-presence-row{
  display:flex;
  flex-direction: row;
  width:100%;
  justify-content: space-around;
}
.i-presence-row-left{
  display: flex;
  flex-direction: column;
  width:45%;
  height:160px;
  background: #FFF200;
  padding:10px;
  cursor: pointer;
}
.i-presence-row-right{
  display: flex;
  width:45%;
  height:160px;
  background: #C4C4C4;
  flex-direction: column;
  padding:10px;
  cursor: pointer;
}
@media only screen and (max-width: 600px) {
  .i-presence-row{
    flex-direction: column;
  }
  .i-presence-row-left{
    width: 100%;
  }
  .i-presence-row-right{
    width: 100%;
  }
  .i-main-middle-stepper {
    min-height: auto;
  }
  .i-address-step{
  padding-top:30px;
  padding-right:0%;
  padding-left:0%
  }
  .i-address-container {
      padding-left: 0%;
      padding-right: 0%;
  }
  .i-step-1{
    padding-right:0%;
  padding-left:0%
  }
  .i-pdf{
    transform: scale(0.7);
  }
}
</style>

<script>
import logicwizard from '../components/LogicWizard'
import addressForm from '../components/addressForm'
import pdf from 'pdfvuer'

export default {
  name: 'WatchPresence',
  components: {
    logicwizard: logicwizard,
    addressForm: addressForm,
    pdf
  },
  data () {
    return {
      tab: 'watch',
      pdfdata: '',
      step: 1,
      canLoadPDF: false,
      guarantee: null
    }
  },
  created: function () {

  },
  mounted () {
    var me = this
    me.guarantee = me.$refs.logicwizard.checkSession()
    me.$refs.logicwizard.setStepColor(2)
    me.gotoTab()
    // me.next(true)
  },
  methods: {
    getDebug () {
      return process.env.DEBUG_NAVIGATION
    },
    updateStatus () {
      var me = this
      me.$refs.logicwizard.updateGuarantee(function () {
        me.gotoTab()
      })
    },
    gotoTab () {
      var me = this
      me.guarantee = me.$refs.logicwizard.checkSession()
      if (me.guarantee.redeemStateID === '00100') {
        me.step = 1
      }
      if (me.guarantee.redeemStateID === '00110') {
        me.step = 2
        me.canLoadPDF = true
      }
      if (me.guarantee.redeemStateID === '00120') {
        me.step = 3
      }
    },
    back () {
      var me = this
      me.$refs.logicwizard.getBackByGuaranteeID(function () {
        me.gotoTab()
      })
    },
    labelProceed () {
      var me = this
      me.$q.dialog({
        message: 'I confirm that I printed shipping label and sent a package',
        cancel: true,
        persistent: true
      }).onOk(() => {
        me.$refs.logicwizard.setStatusSended(function () {
          me.$refs.logicwizard.getNextByGuaranteeID(function () {
            me.gotoTab()
          })
        })
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    },
    getPdf () {
      var me = this
      return process.env.API + '/customer/shiplabel/' + me.guarantee.guaranteeID
    },
    addressSaved (address) {
      var me = this
      me.$refs.logicwizard.saveAddress(address, function (pdf) {
        me.$refs.logicwizard.createShipmentLabel(function () {
          me.$refs.logicwizard.getNextByGuaranteeID(function () {
            me.gotoTab()
          })
        })
      })
    },
    next (presenceOrNot) {
      var me = this
      me.$refs.logicwizard.getNextByGuaranteeID(function () {
        me.gotoTab()
      })
      // me.$refs.logicwizard.setWatchPresentOrNot(presenceOrNot)
    }
  }
}
</script>
