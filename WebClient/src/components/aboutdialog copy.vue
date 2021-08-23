<template>
 <q-dialog v-model="dialogOpen" :square="true" @hide="$emit('close')"
 persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-resize-observer @resize="onResize" />
     <div class="i-aboutdialog-container">
       <div class="i-aboutdialog-close">
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
        </div>
    </div>
    </q-dialog>

</template>

<style>
.i-aboutdialog-closebtn {
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #FFF200;
  text-transform: uppercase;
  font-size: 16px;
  line-height: 30px;
  color: #58595B;
  font-weight: bold;
  height: 40px;
  cursor: pointer;
  font-family: RobotoRegular;
  user-select: none;
  min-width:120px;
}
.i-aboutdialog-body{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.i-aboutdialog-body-60-label{
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 168.5%;
color: #000000;
}
.i-aboutdialog-body-60-line{
font-family: Roboto;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 168.5%;
color: #000000;
}
.i-aboutdialog-body-60{
  padding: 20px 60px;
  display: flex;
  height: 70%;
  justify-content: space-evenly;
  flex-direction: column;
}
.i-aboutdialog-body-40{
  display: flex;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.i-aboutdialog-close-icon{
  position:absolute;
  right:0px;
}
.i-aboutdialog-label{
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  font-family: RobotoRegular;
  color: #FFF200;
  border-top: 2px solid #FFF200;
  border-bottom: 2px solid #FFF200;
  opacity: 0.8;
  align-self: center;
}
.i-aboutdialog-body{
  background: white;
  height:350px;
}
.i-aboutdialog-close{
  display:flex;
  flex-direction: row;
  padding:3px;
  background-image:    url("/statics/dialogbg2.jpg");
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center;
  height: 100px;
  position: relative;
  justify-content: center;
}

.i-aboutdialog-container{
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0px 4px 30px #8E9EAE!important;
  width: 560px;
  max-width: 80vw;
}
@media only screen and (max-width: 600px) {
  .i-aboutdialog-body {
    height: 450px;
}
.i-aboutdialog-body-60-line div{
  padding-top:5px;
}
}
</style>

<script>
export default {
  name: 'aboutdialog',
  components: {
  },
  props: ['open'],
  data () {
    return {
      isMobile: false,
      dialogOpen: false,
      maximizedToggle: this.$q.platform.is.mobile
    }
  },
  watch: {
    'open': function (val) {
      var me = this
      me.dialogOpen = val
    }
  },
  created: function () {
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
