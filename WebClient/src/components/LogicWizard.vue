<template>
  <div style="display:none"> </div>
</template>

<script>
import customerService from '../app/services/customerService'
import boltService from '../app/services/boltService'
import EventBus from '../app/globalbus'

import moment from 'moment'
export default {
  name: 'LogicWizard',
  data () {
    return {
      gData: null
    }
  },
  created () {
  },
  methods: {
    setStepColor (step) {
      for (var i = 0; i < 5; i++) {
        document.querySelectorAll('.q-stepper__dot')[i].style.background = '#e0e0e0'
      }
      for (var i2 = 0; i2 < step; i2++) {
        document.querySelectorAll('.q-stepper__dot')[i2].style.background = '#FFF200'
      }
    },
    checkSession () {
      var me = this
      var gDataString = sessionStorage.getItem('GUARANTEE_DATA')
      if (gDataString) {
        me.gData = JSON.parse(gDataString)
      } else {
        me.$router.push('/')
      }
      return me.gData
    },
    showError (text, timepout) {
      var me = this
      if (me.dismiss) {
        me.dismiss()
      }
      var out = 2000
      if (timepout) {
        out = timepout
      }
      me.dismiss = me.$q.notify({
        message: text,
        position: 'center',
        timeout: out,
        color: 'negative'
      })
    },
    updateGuarantee (callbackf) {
      var me = this
      var gDataString = sessionStorage.getItem('GUARANTEE_DATA')
      if (gDataString) {
        me.gData = JSON.parse(gDataString)
        customerService.getGuaranteeByID(me.gData.guaranteeID).then((data) => {
          if (data.status === 'error') {
            return
          }
          sessionStorage.setItem('GUARANTEE_DATA', JSON.stringify(data.data))
          EventBus.$emit('GUARANTEE_DATA', data.data)
          if (callbackf) {
            callbackf()
          }
        })
      }
    },
    proccessGuarantee (data, callbackf) {
      var me = this
      console.log(data)
      if (data.status === 'error') {
        me.showError(data.errorMessage)
        return
      }
      sessionStorage.setItem('GUARANTEE_DATA', JSON.stringify(data.data))
      EventBus.$emit('GUARANTEE_DATA', data.data)

      if (data.data.status === 'Cancelled') {
        callbackf('cancelled', data.data)
        return
      }

      var isBefore = moment().isSameOrBefore(data.data.coverageStarts)
      var isAfter = moment().isSameOrAfter(data.data.coverageEnds)

      if (callbackf && isBefore) {
        callbackf('notactive', data.data)
        return
      }
      if (callbackf && isAfter) {
        callbackf('overdue', data.data)
        return
      }
      if (callbackf) {
        callbackf()
      }
      if (data.data.redeemStateID === '' || data.data.redeemStateID === '00100' ||
      data.data.redeemStateID === '00110' || data.data.redeemStateID === '00120') {
        me.$router.push('/g/watchpresence')
        return
      }
      if (data.data.redeemStateID === '00200') {
        me.$router.push('/g/selectwatch')
        return
      }
      if (data.data.redeemStateID === '00300') {
        me.$router.push('/g/enteraddress')
        return
      }
      if (data.data.redeemStateID === '00400') {
        me.$router.push('/g/checkout')
      }
      if (data.data.redeemStateID === '00500') {
        me.$router.push('/g/enjoy')
      }
    },
    guaranteeNumberEntered (number, callbackf) {
      var me = this
      me.$q.loading.show()
      customerService.getGuaranteeByID(number).then((data) => {
        me.proccessGuarantee(data, callbackf)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
    },
    login (number, callbackf) {
      var me = this
      me.$q.loading.show()
      customerService.login(number).then((data) => {
        me.proccessGuarantee(data, callbackf)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
    },
    setWatchPresentOrNot (presenceOrNot) {
      var me = this
      me.$q.loading.show()
      customerService.setWatchPresentOrNot(me.gData.guaranteeID, presenceOrNot).then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        me.guaranteeNumberEntered(me.gData.guaranteeID)
        console.log(data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
      // this.$router.push('/g/selectwatch')
    },
    setStatusSended (callbackf) {
      var me = this
      me.$q.loading.show()
      customerService.setSendingStatus(me.gData.guaranteeID, 'Sent').then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        if (callbackf) {
          callbackf()
        }
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
      // this.$router.push('/g/selectwatch')
    },
    setReadyToPick (callbackf) {
      var me = this
      me.$q.loading.show()
      customerService.setOutboundStatus(me.gData.guaranteeID, 'Ready to Pick').then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        if (callbackf) {
          callbackf()
        }
        me.getNextByGuaranteeID(callbackf)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
    },
    setAddressbyGuaranteeID (address) {
      var me = this
      address.guaranteeID = me.gData.guaranteeID
      me.$q.loading.show()
      customerService.setAddressbyGuaranteeID(address).then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        me.getNextByGuaranteeID()
        // me.guaranteeNumberEntered(me.gData.guaranteeID)
        console.log(data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
      // this.$router.push('/g/selectwatch')
    },
    saveAddress (address, callbackf) {
      var me = this
      address.guaranteeID = me.gData.guaranteeID
      me.$q.loading.show()
      customerService.setAddressbyGuaranteeID(address).then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          me.$q.loading.hide()
          return
        }
        if (callbackf) {
          callbackf()
        }
        console.log(data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        // me.$q.loading.hide()
      })
    },
    getBackByGuaranteeID (callbackf) {
      var me = this
      me.$q.loading.show()
      customerService.getBackByGuaranteeID(me.gData.guaranteeID).then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        me.guaranteeNumberEntered(me.gData.guaranteeID, callbackf)
        console.log(data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
    },
    getNextByGuaranteeID (callbackf) {
      var me = this
      me.checkSession()
      me.$q.loading.show()
      customerService.getNextByGuaranteeID(me.gData.guaranteeID).then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        me.guaranteeNumberEntered(me.gData.guaranteeID, callbackf)
        console.log(data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
    },
    watchProceed (watch) {
      var me = this
      me.$q.loading.show()
      customerService.setSelectedWatchbyGuaranteeID(me.gData.guaranteeID, watch.no, watch.price, watch.description).then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        me.getNextByGuaranteeID()
        // me.guaranteeNumberEntered(me.gData.guaranteeID)
        console.log(data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
      // this.$router.push('/g/selectwatch')
    },
    createOrder (callback) {
      var me = this
      boltService.createOrder(me.gData.guaranteeID).then((data) => {
        if (data.status !== 'success') {
          me.showError(data.errorMessage)
          return
        }
        callback(data.data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
      })
    },
    createShipmentLabel (callback) {
      var me = this
      me.$q.loading.show()
      customerService.createShipmentLabel(me.gData.guaranteeID).then((data) => {
        if (data.status !== 'success') {
          me.showError('Error creating label. Review address fields.', 4000)
          return
        }
        callback(data)
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
    }
  }
}
</script>
