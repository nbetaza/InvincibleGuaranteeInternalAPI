<template>
  <div class='q-px-lg q-pb-md' style='height:100vh'>
    <logicwizard ref='logicwizard'/>
    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn v-if="guarantee && guarantee.canGetBack" round color="yellow-12" text-color="black" icon="arrow_back" @click="back"/>
      <span v-if="getDebug() ==='true'" style="color:#e0e0e0" @click="back">  back debug</span>
    </q-page-sticky>
    <div class='i-checkout-title'> <span>Check Out</span></div>
    <div class='q-pa-lg'>
      <div class="row i-check-row" v-if="guarantee">
        <div class="i-img-checkout i-check-col">
           <q-img
              :src="getItemImageUrl(guarantee.selectedModelID)"
              :ratio="1/4"
              spinner-color="grey-5"
              style="max-width: 200px; height: 300px;"
            />
        </div>
        <div class="i-check-col">
          <div class=" q-mt-sm"><span class="i-price-label">Model:</span> {{guarantee.selectedModelID}}</div>
          <div class="q-mt-sm"><span class="i-price-label">Name:</span> <div style="display: grid;"> {{guarantee.selectedModelName}}</div></div>
          <div class="q-mt-sm"><span class="i-price-label">Price:</span>  $ {{guarantee.selectedPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}} </div>
          <div v-if="guarantee.amountToPay > 0" class="q-mt-sm"><span class="i-price-label">Tax:</span> $ {{guarantee.salesTax.toLocaleString(undefined, {minimumFractionDigits: 2})}} </div>
          <div v-if="guarantee.amountToPay > 0" class="q-mt-sm"><span class="i-price-label">Subtotal:</span> $ {{(guarantee.salesTax + guarantee.selectedPrice).toLocaleString(undefined, {minimumFractionDigits: 2})}} </div>
          <div class="q-mt-sm"><span class="i-price-label">Your Balance:</span> $ {{guarantee.confirmedBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}} </div>
          <div v-if="guarantee.amountToPay > 0" class="q-mt-sm"><span class="i-price-label">Amount owed:</span> $ {{(guarantee.amountToPay + guarantee.salesTax).toLocaleString(undefined, {minimumFractionDigits: 2})}} </div>
          <div v-if="guarantee.amountToPay <= 0" class="q-mt-sm"><span class="i-price-label">Amount owed:</span> No payment required </div>
          <div v-show="guarantee.amountToPay > 0" class='q-mt-sm bolt-checkout-button bolt-multi-step-checkout'></div>
          <div v-if="guarantee.amountToPay <= 0" @click="addressDialogOpen = true" class="i-btn-address">Change address</div>
          <div v-if="guarantee.amountToPay <= 0" class="i-btn-address-y" @click="readyToPick()">Proceed</div>
        </div>
      </div>
    </div>
    <q-dialog v-model="addressDialogOpen" :square="true" @hide="$emit('close')"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down">
       <div class="i-addres-checkout-container" >
       <div class="i-addres-checkout-close">
       <q-btn icon="close" flat round dense v-close-popup />
       </div>
        <addressForm @addressSaved="addressSaved"/>
        </div>
    </q-dialog>
  </div>
</template>

<style>
.i-price-label{
  font-weight: bold;
    display: block;
    width: 110px;
    float: left;
    text-align: end;
    padding-right: 10px;
}
.i-btn-address-y {
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
  text-align: center;
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
.i-addres-checkout-close{
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  padding:3px;
}
.i-addres-checkout-container{
  padding:30px;
  display: flex;
  flex-direction: column;
  outline:9px solid #FFF200;
  background: white;
  max-width: 800px!important;
  min-width: 500px!important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.i-img-checkout{
  justify-content: center;
  align-items: center;
  display: flex;
}

.i-checkout-title{
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
 .i-check-col{
    width:50%;
  }
@media only screen and (max-width: 600px) {
  .i-check-row{
    flex-direction: column;
  }
  .i-check-col{
    width:100%;
  }
}
</style>

<script>
import logicwizard from '../components/LogicWizard'
import addressForm from '../components/addressForm'

export default {
  name: 'WatchPresence',
  components: {
    logicwizard: logicwizard,
    addressForm: addressForm
  },
  data () {
    return {
      addressDialogOpen: false,
      guarantee: null,
      token: '',
      contact: {
        id: ''
      }
    }
  },
  created: function () {
  },
  mounted () {
    var me = this
    me.guarantee = me.$refs.logicwizard.checkSession()
    me.$refs.logicwizard.setStepColor(4)
    if (me.guarantee.amountToPay > 0) {
      var trackScript = document.createElement('script')
      trackScript.setAttribute('id', 'bolt-track')
      trackScript.setAttribute('type', 'text/javascript')
      trackScript.setAttribute('src', process.env.BOLT_TRACK_JS)
      trackScript.setAttribute('data-publishable-key', process.env.BOLT_PUB_KEY)
      document.head.appendChild(trackScript)

      var connectScript = document.createElement('script')
      connectScript.setAttribute('id', 'bolt-connect')
      connectScript.setAttribute('type', 'text/javascript')
      connectScript.setAttribute('src', process.env.BOLT_CONNECT_JS)
      connectScript.setAttribute('data-publishable-key', process.env.BOLT_PUB_KEY)
      document.head.appendChild(connectScript)

      connectScript.onload = function () {
        console.log(' CONNECT LOADED !!!')
        me.$refs.logicwizard.createOrder(function (token) {
          me.token = token
          me.bolt()
        })
      }
    }
  },
  methods: {
    getDebug () {
      return process.env.DEBUG_NAVIGATION
    },
    addressSaved (address) {
      var me = this
      me.$refs.logicwizard.saveAddress(address, function (pdf) {
        me.$q.loading.hide()
      })
      me.addressDialogOpen = false
    },
    getItemImageUrl (id) {
      return process.env.API + '/images/item/' + id
    },
    back () {
      var me = this
      me.$refs.logicwizard.getBackByGuaranteeID()
    },
    readyToPick () {
      var me = this
      me.$refs.logicwizard.setReadyToPick()
    },
    bolt () {
      console.log('bolt call')
      console.log(window.BoltCheckout)
      var me = this
      me.cart = {
        orderToken: me.token
      }
      var firstName = ''
      var lastName = ''
      if (me.guarantee.customerName) {
        if (me.guarantee.customerName.split(' ').length >= 2) {
          firstName = me.guarantee.customerName.split(' ')[0]
          lastName = me.guarantee.customerName.split(' ')[1]
        } else {
          firstName = me.guarantee.customerName
        }
      }
      me.hints = {
        prefill: {
          firstName: firstName,
          lastName: lastName,
          email: me.guarantee.customerEmail,
          phone: me.guarantee.customerPhone,
          addressLine1: me.guarantee.customerAddress1,
          addressLine2: me.guarantee.customerAddress2,
          city: me.guarantee.customerCity,
          state: me.guarantee.customerStateFull,
          zip: me.guarantee.customerPostalCode,
          country: me.guarantee.customerCountry // ISO Alpha-2 format expected
        }
      }
      me.callbacks = {
        check: function () {
          return true
        },
        onCheckoutStart: function () {
        },
        onEmailEnter: function (email) {
        },
        onShippingDetailsComplete: function () {
        },
        onShippingOptionsComplete: function () {
        },
        onPaymentSubmit: function () {
        },
        success: function (transaction, callback) {
          me.readyToPick()
          callback()
        },
        close: function () {
        }
      }
      console.log('me.cart: ')
      console.log(me.cart)
      window.BoltCheckout.configure(me.cart, me.hints, me.callbacks)
    }
  }
}
</script>
