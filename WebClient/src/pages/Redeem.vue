<template>

  <q-page class="flex row i-page" style="justify-content: center;">

    <div class="i-login-view">
        <transition
        appear
        enter-active-class="animated slideInRight"
        >
            <div class="i-login-content"  v-show="guarantee === null">
                <span class="i-login-input-title"> Enter your guarantee number </span>

                <q-input outlined stack-label square color="grey" bg-color="white" :error="$v.externalID.$error"
                v-model="externalID" class="q-mb-sm" mask="NNNN-NNNN-NNNN" placeholder="####-####-####"/>
                <div @click="loginClicked" class="i-btn-r q-mt-sm">CONTINUE</div>
                <div class="i-content-text-forgot q-mt-lg" @click="backToLogin">Back</div>

            </div>
        </transition>
        <transition
        appear
        enter-active-class="animated slideInRight"
        >
        <div class="i-register-content"  v-if="guarantee !== null">
            <span class="i-login-input-title" style="font-size:20px;color:white;">INVINCIBLE GUARANTEE {{guarantee.guaranteeID}} IS <span style="color:#FFF200">INACTIVE</span></span>
            <span class="i-login-input-title" style="font-size:20px;color:white;padding-top:10px">COVERAGE ACTIVATION DATE IS   <span style="color:#FFF200">{{guarantee.coverageStarts}}</span></span>

            <div class="i-content-text-forgot q-mt-lg" @click="backToLogin">Back</div>
        </div>
        </transition>
    </div>

  </q-page>
</template>

<style>
.i-content-text-forgot{
  font-size:12px;
  text-decoration: underline;
  cursor: pointer;
  color: #FFF200;
}
.q-field__marginal{
  height: 40px;
}
.q-field__control{
  height:40px;
}
.i-login-input-title{
  font-family: Arimo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  padding-bottom:3px;

/* Light gray */

color: #C7C8CA;
}
.i-page {
  font-family: Arimo;
  background-color: #333333;
  background-size:     auto 90%;
  background-repeat:   no-repeat;
  background-position: right 0px center;
}
.i-btn-r {
     user-select: none;
  display: flex;
  justify-content: center;
  padding:10px;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  height: 40px;
  min-width: 250px;
  cursor: pointer;
  font-family:Din;
  display: flex;
  align-items: center;
  text-align: center;
  color: #58595B;
  background: #FFF200;
  box-sizing: border-box;
}
.i-login-view{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.i-login-content{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.i-register-content{
  display: flex;
  justify-content: center;
  padding-top:30px;
  flex-direction: column;
}
.i-content-register{
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  font-family: Din;
}
.i-content-text{
  font-size:14px;
  text-align: center;
  margin-top:40px;
}
.i-content-text-forgot{
  font-size:14px;
  text-align: center;
  margin-top:30px;
  text-decoration: underline;
  cursor: pointer;
}
.i-content-text-reg{
  font-size:14px;
  text-align: center;
  margin-top:5px;
  text-decoration: underline;
  cursor: pointer;
}
.t-login{
  width: 300px;
  height:400px;
  position: absolute;
  top:30%;
}
.t-forget-pass{
  cursor: pointer;
  color:#337AB7;
}
@media only screen and (max-width: 415px) {
  .i-btn{
    min-width: 222px;
  }
  .i-login-view {
    padding-right: 20%;
  }
}
</style>

<script>
import { required } from 'vuelidate/lib/validators'
import customerService from '../app/services/customerService'

export default {
  name: 'Redeem',
  components: {
  },
  data () {
    return {
      guarantee: null,
      externalID: ''
    }
  },
  validations: {
    externalID: { required }
  },
  created () {
  },
  methods: {
    backToLogin () {
      var me = this
      me.$router.push('/')
    },
    showError (text) {
      var me = this
      if (me.dismiss) {
        me.dismiss()
      }
      me.dismiss = me.$q.notify({
        message: text,
        position: 'bottom',
        timeout: 2000,
        color: 'negative'
      })
    },
    loginClicked () {
      var me = this
      me.$v.externalID.$touch()
      if (me.$v.externalID.$error) {
        me.showError('Correct the Highlighted Fields')
        return
      }
      me.$q.loading.show()
      customerService.getGuaranteeByID(me.externalID).then((data) => {
        console.log(data)
        if (data.status === 'error') {
          me.showError('Guarantee number not found')
          return
        }
        me.guarantee = data.data
      }, (error) => {
        console.error(error.message)
      }).then(() => {
        me.$q.loading.hide()
      })
      /*
      setTimeout(function () {
        me.account = 'noway'
        me.$q.loading.hide()
      }, 2000)
      */
    },
    login () {
    },
    registerContinue () {
    }
  }
}
</script>
