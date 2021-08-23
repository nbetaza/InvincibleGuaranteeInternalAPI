<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="i-main-div">
        <div class="i-main-middle">
          <div class="i-main-middle-navbar">
            <div  class="i-main-middle-navbar-col">
              <div  class="i-main-middle-navbar-col-label">
              Guarantee number:
              </div>
               <div  class="i-main-middle-navbar-col-data">
              {{gData.guaranteeID}}
              </div>
            </div>
            <div  class="i-main-middle-navbar-col">
              <div  class="i-main-middle-navbar-col-label">
              Current watch model:
              </div>
               <div  class="i-main-middle-navbar-col-data">
              {{gData.modelID}}
              </div>
            </div>
            <div  class="i-main-middle-navbar-col">
              <div  class="i-main-middle-navbar-col-label">
              Guarantee Expiry Date:
              </div>
               <div  class="i-main-middle-navbar-col-data">
              {{gData.coverageEnds}}
              </div>
            </div>
            <div  class="i-main-middle-navbar-col">
              <div  class="i-main-middle-navbar-col-label">
              Balance:
              </div>
               <div  class="i-main-middle-navbar-col-data">
                $ {{parseFloat(balance).toLocaleString(undefined, {minimumFractionDigits: 2})}}

              </div>
            </div>
          </div>
          <div class="i-main-middle-logo">
            <div class="i-main-middle-logo-left">
              <!--Invincible Guarantee-->
            </div>
            <div class="i-main-middle-logo-right">
              <!--Trade In, Trade UP-->
            </div>
          </div>
          <div class="i-main-middle-stepper">
             <stepper :width="900"/>
          </div>
          <div class="i-main-middle-content">
             <router-view />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style>
.i-main-middle-navbar-col {
  font-weight: bold;
  font-size: 16px;
}
.i-main-middle-navbar-col-label {
  color: #ccc;
  font-family: RobotoThin;
}
.i-main-middle-navbar-col{
  align-self: center;
}
.i-main-middle-logo-left{
  margin-left: 20px;
  text-transform: uppercase;
  font-size:25px;
  color:white;
  font-family: RobotoBold;
}
.i-main-middle-logo-right{
  margin-right: 20px;
  text-transform: uppercase;
  font-size:25px;
  color:white;
    font-family: RobotoBold;

}
.i-main-div{
  display:flex;
  flex-direction: row;
  justify-content: center;
  background: black;

}
.i-main-middle{
  display:flex;
  width:70%;
  height:100%;
  flex-direction: column;
  background: white;
}
.i-main-middle-navbar{
  display: flex;
  width:100%;
  height: 70px;
  background: black;
  color: white;
  justify-content:space-around;
  font-family: Roboto;
  font-size: 13px;
}
.i-main-middle-logo{
  display: flex;
  width: 100%;
  height: 90px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-image:    url("/statics/IG_Page_Banner.jpg");
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center
}
.i-main-middle-stepper{
  display: flex;
  width:100%;
  min-height: 90px;
  justify-content: center;
}
@media only screen and (max-width: 1030px) {
  .i-main-middle{
    width:90%;
  }
}
@media only screen and (max-width: 600px) {
  .i-main-middle{
    width:100%;
  }
  .i-main-middle-navbar{
    width: 100%;
    flex-direction: column;
    padding: 5px;
    height: auto;
  }
  .i-main-middle-navbar-col {
    width: 90%;
    align-self: center;
    justify-content: space-between;
    display: flex;
  }
  .i-main-middle-logo-left{
    font-size:15px;
    display:none;
  }
  .i-main-middle-logo-right{
    font-size:15px;
    display:none;
  }
  .i-main-middle-logo{
    display: none;
  }
}
</style>

<script>
import stepper from '../components/StepperLayout'
import EventBus from '../app/globalbus'

export default {
  name: 'LoginLayout',
  components: {
    stepper: stepper
  },
  data () {
    return {
      balance: 0
    }
  },
  mounted () {

  },
  watch: {
    '$route': function (route) {
      var me = this
      console.log('route changed')
      console.log(route.path)
      var gDataString = sessionStorage.getItem('GUARANTEE_DATA')
      if (gDataString) {
        var guarantee = JSON.parse(gDataString)
        console.log('guarantee')
        console.log(guarantee)
        var redeemStateID = guarantee.redeemStateID
        var validRoute = me.getRouteByID(redeemStateID)
        console.log('route valid')
        console.log(validRoute)
        if (route.path !== validRoute) {
          me.$router.push(validRoute)
        }
      } else {
        me.$router.push('/')
      }
    }
  },
  created () {
    var me = this
    var gDataString = sessionStorage.getItem('GUARANTEE_DATA')
    if (gDataString) {
      me.gData = JSON.parse(gDataString)
      me.balance = parseFloat(me.gData.confirmedBalance)
    } else {
      me.$router.push('/')
    }
    EventBus.$on('GUARANTEE_DATA', function (data) {
      me.balance = parseFloat(data.confirmedBalance)
    })
  },
  methods: {
    // todo: refactore it with logic wizard
    getRouteByID (redeemStateID) {
      if (redeemStateID === '' || redeemStateID === '00100' ||
        redeemStateID === '00110' || redeemStateID === '00120') {
        return '/g/watchpresence'
      }
      if (redeemStateID === '00200') {
        return '/g/selectwatch'
      }
      if (redeemStateID === '00300') {
        return '/g/enteraddress'
      }
      if (redeemStateID === '00400') {
        return '/g/checkout'
      }
      if (redeemStateID === '00500') {
        return '/g/enjoy'
      }
      return '/'
    }
  }
}
</script>
