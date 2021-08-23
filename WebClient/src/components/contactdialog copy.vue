<template>
 <q-dialog v-model="dialogOpen" :square="true" @hide="$emit('close')"
 persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-resize-observer @resize="onResize" />
     <div class="i-contactdialog-container">
       <div class="i-contactdialog-close">
       <q-btn class="i-contactdialog-close-icon" color="white" icon="close" flat round dense v-close-popup @click="$emit('close')" />
       <div class="i-contactdialog-label">Contact us</div>
       </div>
        <div class="i-contactdialog-body">
          <div class="i-contactdialog-body-60">
            <div class="i-contactdialog-body-60-label">
              Invincible Guarantee Customer Service:
            </div>
             <div class="i-contactdialog-body-60-line">
               <q-icon name="call" class="q-mr-sm"/>844-482-4363
            </div>
             <div class="i-contactdialog-body-60-line">
              <q-icon name="email" class="q-mr-sm"/> help@invincibleguarantee.com
            </div>
          </div>
          <div class="i-contactdialog-body-40">
              <div @click="$emit('close')" class="i-contactdialog-closebtn">Close</div>
          </div>
        </div>
    </div>
    </q-dialog>

</template>

<style>
.i-contactdialog-closebtn {
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
.i-contactdialog-body{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.i-contactdialog-body-60-label{
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 168.5%;
color: #000000;
}
.i-contactdialog-body-60-line{
font-family: Roboto;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 168.5%;
color: #000000;
}
.i-contactdialog-body-60{
  padding: 20px 60px;
  display: flex;
  height: 60%;
  justify-content: space-evenly;
  flex-direction: column;
}
.i-contactdialog-body-40{
  display: flex;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.i-contactdialog-close-icon{
  position:absolute;
  right:0px;
}
.i-contactdialog-label{
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
.i-contactdialog-body{
  background: white;
  height:250px;
}
.i-contactdialog-close{
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

.i-contactdialog-container{
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0px 4px 30px #8E9EAE!important;
  width: 560px;
  max-width: 80vw;
}
</style>

<script>
export default {
  name: 'contactdialog',
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
