<template>
  <div class="i-address-container">

        <span class="i-change-input-title" style="padding-top:0px">Zip Code</span>

          <div class="i-zip" style="">
            <div style="display:flex; width:100%">
               <q-input outlined stack-label square color="grey" style="width:100%;margin-right:5px;"
                  bg-color="white" :error="$v.addressForm.postalCode.$error"
                v-model="addressForm.postalCode" class=""/>
            </div>
            <div class="i-lookup-cont" style="">
             <div class="i-lookup" @click="zipLookup"> LOOKUP </div>
            </div>
          </div>

          <span class="i-change-input-title">Address</span>
          <q-input outlined stack-label square color="grey"
                bg-color="white" :error="$v.addressForm.address1.$error"
              v-model="addressForm.address1" class=""/>
         <span class="i-change-input-title">Address 2</span>
          <q-input outlined stack-label square color="grey"
            bg-color="white"
          v-model="addressForm.address2" class=""/>

          <span class="i-change-input-title">City</span>
          <q-input outlined stack-label square color="grey"
            bg-color="white" :error="$v.addressForm.city.$error"
          v-model="addressForm.city" class=""/>

           <span class="i-change-input-title">State</span>
          <!-- <q-input outlined stack-label square color="grey"
            bg-color="white" :error="$v.addressForm.state.$error"
          v-model="addressForm.state" class=""/> -->

          <q-select stack-label square color="grey"  bg-color="white" outlined :error="$v.addressForm.state.$error"
          v-model="addressForm.state" :options="options" />

           <span class="i-change-input-title">Country</span>
          <q-input outlined stack-label square color="grey" readonly
            bg-color="white" :error="$v.addressForm.country.$error"
          v-model="addressForm.country" class=""/>

           <span class="i-change-input-title">Name</span>
          <q-input outlined stack-label square color="grey"
            bg-color="white" :error="$v.addressForm.name.$error"
          v-model="addressForm.name" class=""/>

           <span class="i-change-input-title">Phone</span>
          <q-input outlined stack-label square color="grey" mask="(###) ### - ####"
            bg-color="white" :error="$v.addressForm.phone.$error"
          v-model="addressForm.phone" class=""/>

        <div @click="saveClicked" class="i-btn-contact">PROCEED</div>

        <q-dialog v-model="lookUpDialogError">
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">No addresses were found matching that zip code</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="grey" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
</template>

<style>
.q-field--with-bottom{
  padding-bottom: 0px;
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
.i-zip{
  display:flex;
  flex-direction:row;
  width:100%
}
.i-lookup-cont{
  display:flex;
  width:20%
}
@media only screen and (max-width: 600px) {
  .i-lookup-cont{
    width:40%
  }
}
</style>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import _ from 'lodash'
import customerService from '../app/services/customerService'

export default {
  name: 'AddressForm',
  components: {
  },
  data () {
    return {
      options: [
        'AA', 'AE', 'AK', 'AL', 'AP', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'PW', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'
      ],
      lookUpDialogError: false,
      addressForm: {
        address1: '',
        address2: '',
        address3: '',
        city: '',
        postalCode: '',
        state: '',
        country: '',
        name: '',
        phone: ''
      }
    }
  },
  validations: {
    addressForm: {
      address1: { required, maxLength: maxLength(80) },
      city: { required, maxLength: maxLength(60) },
      postalCode: { required, maxLength: maxLength(10) },
      state: { required, maxLength: maxLength(30) },
      country: { required, maxLength: maxLength(30) },
      name: { required, maxLength: maxLength(60) },
      phone: { required, maxLength: maxLength(20) }
    }
  },
  created: function () {
  },
  mounted () {
    var me = this
    var gDataString = sessionStorage.getItem('GUARANTEE_DATA')
    if (gDataString) {
      var guarantee = JSON.parse(gDataString)
      me.addressForm.address1 = guarantee.customerAddress1
      me.addressForm.address2 = guarantee.customerAddress2
      me.addressForm.city = guarantee.customerCity
      me.addressForm.postalCode = guarantee.customerPostalCode
      me.addressForm.state = guarantee.customerState
      me.addressForm.country = guarantee.customerCountry
      me.addressForm.phone = guarantee.customerPhone
      me.addressForm.name = guarantee.customerName
    }
  },
  methods: {
    zipLookup () {
      var me = this
      me.addressForm.postalCode = me.addressForm.postalCode.replace(/\s/g, '')
      if (me.addressForm.postalCode.length !== 5) {
        me.lookUpDialogError = true
        return
      }
      customerService.getAddressByZip(me.addressForm.postalCode).then((response) => {
        var finded = _.find(response.data, { code: me.addressForm.postalCode })
        if (finded) {
          me.addressForm.city = finded.city
          me.addressForm.country = finded.country
          me.addressForm.state = finded.state
        } else {
          me.lookUpDialogError = true
        }
      })
    },
    saveClicked () {
      var me = this
      me.$v.addressForm.$touch()
      if (me.$v.addressForm.$error) {
        me.$q.notify({
          message: 'Correct the highlighted fields',
          position: 'bottom',
          timeout: 2000,
          color: 'negative'
        })
        return
      }
      me.$emit('addressSaved', me.addressForm)
    },
    next (presenceOrNot) {
    }
  }
}
</script>
