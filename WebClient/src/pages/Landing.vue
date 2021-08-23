<template>
 <q-page class="flex row i-splash-page">
   <logicwizard ref="logicwizard"/>
    <q-resize-observer @resize="onResize" />
   <transition
    appear
    enter-active-class="animated slideInUp"
    >
   <div class="i-splash-container-50" v-show="tab === 'enter'">
     <div class="i-splash-row-label">
       <div class="i-logo-div" style="display:flex;flex-direction:column">
       <!-- <img src="/statics/Logo.png" class="i-logo-img"/> -->
       <span class="i-splash-label">Invincible Guarantee</span>
        <span class="i-splash-label2">the official invicta trade in program</span>
       </div>
    </div>
    <div class="i-splash-row-types">
      <div class="i-types-columns">
        <div class="i-types-column-div">
          <img src="/statics/trade-in-logo.svg" style="height:45px"/>
          <div class="i-types-column-div-label">Trade in</div>
           <div class="i-types-column-div-body">Exchange your old watch for a new one with the same value as your original watch.</div>
        </div>
         <div class="i-types-column-div">
                     <img src="/statics/tradeup-icon.svg" style="height:45px"/>

          <div class="i-types-column-div-label">Trade up</div>
           <div class="i-types-column-div-body">Trade your watch in for a higher priced model by just paying the difference.</div>
        </div>
        <!-- <div class="i-types-column-div">
          <div class="i-types-column-div-label">Replace</div>
           <div class="i-types-column-div-body">If your watch is lost or stolen get a brand new one by just paying 20% of the price of your original watch.</div>
        </div> -->
      </div>
    </div>
    <div class="i-splash-row-input">
      <div class="i-splash-row-input-container">
       <q-input outlined stack-label square color="yellow" bg-color="white" spellcheck="false"
                v-model="guaranteeNo" class="q-mb-sm" mask="NNNN-NNNN-NNNN" placeholder="ENTER YOUR GUARANTEE NUMBER">
                 <template v-slot:append>
          <div :class="{'i-go-btn': true, 'i-disable': guaranteeNo.length!=14}" @click="numberEntered"> GO </div>
        </template>
       </q-input>
       </div>
    </div>
    <div class="i-splash-row-steps">
      <span v-if="!isMobile" class="i-steps-label" style="cursor:pointer" @click="videoDialog = true;">How it works
        <q-icon color="white" style="font-size: 2.4em;margin-left:5px" name="slideshow" />
      </span>
      <span v-if="isMobile" class="i-steps-label" style="cursor:pointer" @click="showFsVideo()">How it works
        <q-icon color="white" style="font-size: 2.4em;margin-left:5px" name="slideshow" />
      </span>
      <stepper :width="width"/>
    </div>
  </div>
  </transition>
  <transition
    appear
    enter-active-class="animated slideInRight"
    >
  <div class="i-splash-container-50" v-show="tab === 'error'">
     <div class="i-splash-row-label">
       <span class="i-splash-label">Invincible Guarantee</span>
    </div>
    <div class="i-splash-row-steps" v-if="guarantee !== null">
      <div class="i-error-card">
        <q-img src="/statics/Cardlayout.png">
          <div class="absolute-full" style="padding: 5px 0px 1px 0px; height: 100%; background: transparent;">
            <div class="guarantee-number-lbl">GUARANTEE NUMBER</div>
            <div class="guarantee-no">{{guarantee.guaranteeID}}</div>
            <div class="guarantee-status" v-show="status === 'notactive'">IS INACTIVE</div>
            <div class="guarantee-status" v-show="status === 'overdue'">OVERDUE</div>
            <div class="guarantee-status" v-show="status === 'cancelled'">CANCELLED</div>
            <div class="guarantee-coverage-bg" v-show="status === 'notactive'">COVERAGE ACTIVATION DATE IS<p>&nbsp;</p><span class="guarantee-coverage"> {{guarantee.coverageStarts}}</span></div>
            <div class="guarantee-coverage-bg" v-show="status === 'overdue'">COVERAGE END DATE IS<p>&nbsp;</p><span class="guarantee-coverage"> {{guarantee.coverageEnds}}</span></div>
          </div>
        </q-img>
      </div>
    </div>
    <div class="button-back" @click="tab='enter'"><q-icon name="arrow_back" class="q-mr-sm"/>Back</div>
  </div>
  </transition>
    <div class="i-landing-bottom">
      <div class="i-landing-bottom-line1">
        <div class="i-landing-bottom-left">
          <img class="i-ig-logo" src="/statics/Logo.png" />
          <img class="i-hq-logo" src="/statics/IV-17-10076-brand-default.png" />
        </div>
      <div class="i-landing-bottom-right"></div>
      <div class="i-landing-bottom-middle">
          <span @click="contactdialogOpen = true">Contact Us</span>
          <span @click="aboutdialogOpen = true">About</span>
          <span @click="termsdialogOpen = true">Terms and Conditions</span>
        </div>
      </div>
      <!-- <div class="i-landing-bottom-line2">
        <span>© {{new Date().getFullYear()}} Retailing Enterprises LLC, Inc. All rights reserved.</span>
      </div> -->
    </div>
    <contactdialog :open="contactdialogOpen" @close="contactdialogOpen=false"/>
    <aboutdialog :open="aboutdialogOpen" @close="aboutdialogOpen=false"/>
    <termsdialog :open="termsdialogOpen" @close="termsdialogOpen=false"/>

    <q-dialog v-model="videoDialog">
      <div class="row i-video-player-desktop-container">
        <div class="col-12 text-right">
        <q-btn @click="videoDialog = false" class="i-close-video" text-color="white" icon="close" />
        </div>
          <video-player
            class="video-player-box"
            :options="playerOptions"
            style="width: 923px; height: 519px;">
          </video-player>
        </div>
    </q-dialog>

    <div class="row col-12" v-show="showMobileVideo">
      <video-player
        class="video-player-box"
        id="i-video-how-it-works"
        ref="i-video-how-it-works"
        :options="playerOptions"
        :playsinline="true">
      </video-player>
    </div>

<div class="preload-01"></div>
<!-- <div class="i-version-container">
  <p class="i-version-n">{{ version.v }}</p>
</div> -->
</q-page>
</template>

<script>
import stepper from '../components/Stepper'
import contactdialog from '../components/contactdialog'
import aboutdialog from '../components/aboutdialog'
import termsdialog from '../components/termsdialog'
import logicwizard from '../components/LogicWizard'

import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

import helper from '../app/helper'

export default {
  name: 'Landing',
  components: {
    stepper: stepper,
    contactdialog: contactdialog,
    aboutdialog: aboutdialog,
    termsdialog: termsdialog,
    logicwizard: logicwizard,
    videoPlayer
  },
  data () {
    return {
      videoDialog: false,
      showMobileVideo: false,
      isMobile: helper.isMobile(),
      contactdialogOpen: false,
      aboutdialogOpen: false,
      termsdialogOpen: false,
      guaranteeNo: '',
      tab: 'enter',
      guarantee: null,
      width: 0,
      status: '',
      playerOptions: {
        // videojs options
        muted: false,
        autoplay: (!helper.getWebBrowser().isEdge && !helper.getWebBrowser().isIE),
        language: 'en',
        preload: 'auto',
        sources: [{
          type: 'video/mp4',
          src: '/statics/InvincibleGuaranteeExplainer.mp4'
        }]
        // poster: '/static/images/author.jpg',
      },
      version: 0
    }
  },
  created () {
    var that = this
    helper.getAppVersion().then((res) => { that.version = res })
  },
  computed: {
    player () {
      return this.$refs['i-video-how-it-works'].player
    }
  },
  methods: {
    onResize (size) {
      var me = this
      me.width = size.width
    },
    showFsVideo () {
      this.showMobileVideo = true

      if (this.player.requestFullscreen) {
        this.player.requestFullscreen()
      } else if (this.player.msRequestFullscreen) {
        this.player.msRequestFullscreen()
      } else if (this.player.webkitRequestFullscreen) {
        this.player.webkitRequestFullscreen()
      }
    },
    numberEntered () {
      var me = this
      if (me.guaranteeNo.length !== 14) {
        return
      }
      me.$refs.logicwizard.login(me.guaranteeNo, (status, data) => {
        if (status === 'notactive' || status === 'overdue' || status === 'cancelled') {
          me.status = status
          me.guarantee = data
          me.tab = 'error'
        }
      })
    }
  }
}
</script>

<style>
/* Video player */
.i-video-player-desktop-container {
  overflow: hidden !important;
}
.video-player.video-player-box > div {
  width: 100% !important;
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-js .vjs-big-play-button {
  top: 64% !important;
  left: auto !important;
}
.vjs-big-play-button {
  /* display: none !important; */
}

.q-dialog__backdrop {
  background: #000000cc;
}
.q-dialog__inner--minimized > div {
  max-width: none !important;
}

.preload-01 { background: url("/statics/Main_Artwork.png") no-repeat -9999px -9999px; }

.q-field__native {
  font-size:20px;
   text-transform: uppercase;
}
.q-field__native::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  opacity: 0.4; /* Firefox */
}
.i-contact-div{
  padding-left:30px;
  padding-right:30px;
}
.i-contact-div{
    color:white;
font-size: 2.5vh;
    font-family: RobotoThin;
}
.i-contact-div span{
  color:#FFF200;
  font-family: DinMedium;
}
.i-landing-bottom {
  display:flex;
  position:absolute;
  top: 0px;
  flex-direction: column;
  height:55px;
  width:100%;
}
.i-landing-bottom-line1 {
  display:flex;
  flex-direction:row;
  width:100%;
  height:100%;
  justify-content: space-between;
  align-items: flex-end;
}
.i-landing-bottom-line2 {
  display:flex;
  flex-direction:row;
  width:100%;
  height:40%;
  justify-content: center;
  align-items: center;
  color:#FFF200;
  font-size: 1.4vh;
  font-family: RobotoThin;
  user-select: none
}
.i-landing-bottom-left {
  width: 25%;
  align-content: center;
  align-self: center;
  margin: 11px 0 0 2.5vw;
}
.i-ig-logo {
  width: 126px;
  vertical-align: middle;
}
.i-hq-logo {
  height: 45px;
  vertical-align: middle;
  margin-top:2px;
  margin-left:15px;
}
.i-landing-bottom-right {
  width:25%;
}
.i-landing-bottom-middle {
  width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.i-landing-bottom-middle span{
  margin-right: 2.5vw;
}
.i-landing-bottom-middle span{
  color:#9b9b9b;
  font-size: 2vh;
  font-family: RobotoRegular;
  cursor:pointer;
  user-select: none
}
.i-logo-img{
  width:15vh;
  margin-top:3%;
  margin-bottom:3%;
}
.i-logo-div{
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
}
.i-content-text-forgot{
  font-size:16px;
  text-decoration: underline;
  cursor: pointer;
  color: #FFF200;
}
.q-notification__message {
  text-align: center;
}
.i-steps-label {
  font-style: normal;
  font-weight: bold;
  font-size: 2vh;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-family: DinMedium;
  color: #FFF200;
  font-family: RobotoRegular;
}
.i-splash-row-steps {
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.q-field__control {
  height: 40px!important;
}
.q-field__append {
  height: 40px!important;
}
.i-splash-row-input-container{
  width:40%;
}
.i-go-btn{
  background: #FFF200;
  color: black;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  width: 80px;
  text-align: center;
  cursor:pointer;
  user-select: none;
}
.i-types-column-div-label {
  color: #FFF200;
  text-transform: uppercase;
  font-size:2.5vh;
  font-family: RobotoRegular;

}
.i-types-column-div-body {
  color: #FFFFFF;
  font-size: 2vh;
  font-family: RobotoRegular;
}
.i-types-column-div{
  display: flex;
  width:30%;
  flex-direction: column;
  text-align: center;
  padding: 1% 3%;
}
.i-types-columns{
  display:flex;
  flex-direction: row;
  width:80%;
  justify-content: center;
}
.i-splash-row-input{
  justify-content: center;
  height:20%;
  display:flex;
  flex-direction: row;
  align-items: center;
}
.i-splash-row-types{
  justify-content: center;
  height:25%;
  display:flex;
  flex-direction: row;
}
.i-splash-row-label{
  justify-content: center;
  height:25%;
  display:flex;
  flex-direction: row;
}
.i-splash-label{
  font-style: normal;
  font-weight: bold;
  font-size: 5vh;
  line-height: 5vh;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-family: RobotoRegular;
  color: #FFF200;
}
.i-splash-label2{
  font-style: normal;
  font-weight: bold;
  font-size: 1.7vh;
  line-height: 1.7vh;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-family: RobotoRegular;
  color: white;
}
.i-splash-container-50{
  height: 75vh;
  width:100%;
  display: flex;
  flex-direction: column;
  padding-top:30px;
}

.i-splash-page {
  font-family: Arimo;
  background-color: black;
  background-image:    url("/statics/bgrnd4.jpg");
  background-size: cover;
  font-family: DinMedium;
  background-size: 100%;
  background-repeat:   no-repeat;
  background-position: center bottom
}

.i-disable{
  background: #cdcbcb;
  cursor:not-allowed;
}

.i-error-card{
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
  text-align: center;
  top: 189px;
  width: 374px;
  height: 221px;
  padding-top:2%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0.51%, #000000 100%);
}

.guarantee-number-lbl{
  margin-top: 20px;
  height: 37px;
  top: 205px;
  padding-top:2%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #000000;
}

.guarantee-no{
  top: 237px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 38px;
  text-transform: uppercase;
  color: #828282;
}

.guarantee-status{
  margin-top: 5px;
  height: 20px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  text-transform: uppercase;
  color: #000000;
}

.guarantee-coverage-bg {
  margin-top:25px;
  margin-left: 0px;
  height: 45px;
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  align-items: center;
  text-align: center;
  justify-self: center;
  align-content: center;
  display: flex;
  justify-content: center;
  background: #000000;
}

.guarantee-coverage{
  height: 18px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  align-items: center;
  text-align: center;
  justify-self: center;
  align-content: center;
  text-transform: uppercase;
  align-content: center;
  display: flex;
  justify-content: center;
  color: #FFFFFF;
}

  .button-back{
  color: #FFF200;
  text-transform: uppercase;
  cursor: pointer;
  padding-top: 4%;
  margin-left: 37%;
}
/* 1150px or less */
@media only screen and (max-width: 3000px) {
  .q-field__control {
      height: 40px!important;
  }
  .q-field__append {
    height: 40px!important;
  }
}
/* 1150px or less */
@media only screen and (max-width: 1700px) {
  .q-field__control {
      height: 40px!important;
  }
  .q-field__append {
        height: 40px!important;

  }
    .i-splash-row-input, .i-splash-label {
    margin-top: 2%;
    margin-bottom: 2%;
  }

}
@media only screen and (max-width: 1295px) {
  .button-back{
  margin-left: 35%;
}
}
/* 1150px or less */
@media only screen and (max-width: 1150px) {
  .i-splash-container-50{
    height: 75vh;
  }
    .i-splash-row-input-container {
    width: 60%;
  }
    .i-splash-row-input, .i-splash-label {
    margin-top: 3%;
    margin-bottom: 2%;
  }
  .button-back{
  margin-left: 23%;
}
}

@media only screen and (max-width: 1024px) {
  .i-splash-container-50{
    height: 100%;
  }
  .i-types-column-div {
    width: 100%;
  }
  .i-types-columns{
    flex-direction: column;
  }
  .i-splash-row-input-container {
    width: 90%;
  }
  .i-splash-row-input, .i-splash-label {
    margin-top: 3%;
    margin-bottom: 2%;
  }
  .i-error-card{
    width: 374px;
    height: 221px;
    padding-top:2%;
  }
  .guarantee-coverage-bg {
    margin-top:10px;
    margin-left: 0px;
    height: 35px;
    top: 10px;
    align-content: center;
    display: flex;
    justify-content: center;
  }

  .button-back{
  margin-left: 20%;
}
}
@media only screen and (max-width: 1024px) {
    .q-field__native {
    font-size: 15px!important;
}
  .i-splash-row-types{
    padding-top: 30px;
  }
  .i-splash-container-50{
    padding-top: 50px;
  }
  .i-ig-logo{
    display:none;
  }
  .i-hq-logo{
    display:none;
  }
  .i-landing-bottom-left {
    width: 2%;
  }
  .i-landing-bottom-right {
      width: 2%;
  }

  .i-landing-bottom-middle {
      width: 100%;
  }
  .i-splash-row-input-container {
    width: 80%;
  }
  .i-splash-row-input {
    margin-top: 5%;
    margin-bottom: 5%;
  }
  .i-splash-label{
    padding:0 2%;
    margin-top: 3%;
    margin-bottom: 3%;
  }
  .i-logo-img {
    margin-top: 5%;
  }
  .q-scrollarea-2{
    height: calc(100vh - 200px)!important;
  }
  .i-landing-bottom-middle{
    display:flex;
    justify-content: center;
  }
  .i-landing-bottom-left {
    width: 0%;
  }
  .i-landing-bottom-right {
    width:0%;
  }
}
@media only screen and (max-width: 415px) {
}
</style>

<style scoped>
.i-version-n {
  font-size: 12px;
  color: #000;
  right: 0;
  bottom: 0;
  position: absolute;
  margin: 0 !important;
  padding: 2px 4px 2px 0 !important;
}
</style>
