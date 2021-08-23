<template>
 <q-dialog v-model="dialogOpen" :square="true" @hide="$emit('close')"
 persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-resize-observer @resize="onResize" />
     <div class="i-aboutdialog-container" :style="'background-image:url(' + bgImg.src + ');'">
        <div class="i-aboutdialog-container-40"></div>
        <div class="i-aboutdialog-container-60">
          <div class="i-aboutdialog-close-icon"  @click="$emit('close')"><img src="/statics/Group85close.png"/> </div>

          <div class="i-aboutdialog-title">Contact us</div>
           <div class="i-aboutdialog-txt">Invincible Guarantee Customer Service:</div>
              <div class="i-aboutdialog-txt"> <q-icon name="call" class="q-mr-sm"/>844-482-4363</div>
              <div class="i-aboutdialog-txt"><q-icon name="email" class="q-mr-sm"/> help@invincibleguarantee.com</div>

            <div class="i-aboutdialog-back"  @click="$emit('close')"><q-icon name="arrow_back" class="q-mr-sm"/> BACK</div>
        </div>
       <!-- <div class="i-aboutdialog-close">
       <q-btn class="i-aboutdialog-close-icon" color="white" icon="close" flat round dense v-close-popup @click="$emit('close')" />
       <div class="i-aboutdialog-label">About</div>
       </div>
        <div class="i-aboutdialog-body">
          <div class="i-aboutdialog-body-60">
             <div class="i-aboutdialog-body-60-line">
              <div>Invincible Guarantee is the official trade in program of the <b>Invicta Watch Group</b>.</div>
              <div> Trade in or Trade up your timepiece one time in the 5 year period. </div>
              <div>We pride ourselves in providing our customers with Invincible customer service as well as providing an Invincible experience from start to finish.</div>
            </div>
          </div>
          <div class="i-aboutdialog-body-40">
              <div @click="$emit('close')" class="i-aboutdialog-closebtn">Close</div>
          </div>
        </div> -->
    </div>
    </q-dialog>

</template>

<style>
.i-aboutdialog-back{
  color: #FFF200;
  text-transform: uppercase;
  cursor: pointer;
  padding-top: 4%;
}
.i-aboutdialog-txt{
  padding-bottom: 2%;
}
.i-aboutdialog-title{
  color: #FFF200;
  text-transform: uppercase;
  font-size:22px;
  padding-bottom: 2%;
}
.i-aboutdialog-container {
  display: flex;
  flex-direction: row;
  box-shadow: 0px 4px 30px #8E9EAE!important;
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center;
  position: relative;
  justify-content: flex-start;
  color:white;
}
.i-aboutdialog-container-40{
  display:flex;
  height: 100%;
  width:40%;
}
</style>

<style scoped>
.i-aboutdialog-close-icon{
  text-align: right;
  padding: 8px;
  cursor: pointer;
}
.i-aboutdialog-container-60 {
  display:flex;
  height: 100%;
  margin-left: 84px;
  height: 100%;
  width: 282px;
  flex-direction: column;
  justify-content: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 168.5%;
}
@media only screen and (max-width: 600px) {
.i-aboutdialog-container-60 {
  background: #000000b5 !important;
  width: 100%;
  padding: 4%;
  margin-left: 0;
}
.i-aboutdialog-container-40 {
  width: 0%;
}
}
</style>

<script>
import helper from '../app/helper'

export default {
  name: 'contactdialog',
  components: {
  },
  props: ['open'],
  data () {
    return {
      isMobile: false,
      dialogOpen: false,
      maximizedToggle: true,
      bgImg: {
        src: '/statics/bg-001.jpg'
      }
    }
  },
  watch: {
    'open': function (val) {
      var me = this
      console.log('contact dialog open watch')
      helper.preloadImage(this.bgImg.src).then(() => {
        me.dialogOpen = val
      })
    }
  },
  created: function () {
    console.log('contact dialog created')
    var me = this
    me.dialogOpen = me.open
  },
  methods: {
    onResize (size) {
      var me = this
      if (size.width < 400) {
        me.isMobile = true
      } else {
        me.isMobile = false
      }
    }
  }
}
</script>
