<template>
 <q-dialog v-model="dialogOpen" :square="true" @hide="$emit('close')" style="height:100vh"
 persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-resize-observer @resize="onResize" />
     <div class="i-termsdialog-container" style="">
               <div class="i-main-middle-logo-term">
            <div class="i-main-middle-logo-left">
              <!-- Invincible Guarantee -->
            </div>
            <div class="i-main-middle-logo-right">
             <!-- Trade In, Trade UP -->
            </div>
          </div>
        <div class="i-termsdialog-body">
          <div class="i-termsdialog-body-60">
            <q-scroll-area  class="i-term-scroll" ref="scrollArea" :thumb-style="thumbStyle"
              :content-style="contentStyle"
              :content-active-style="contentActiveStyle">
                <terms/>
             </q-scroll-area>
          </div>
          <div class="i-termsdialog-body-40">
              <div @click="$emit('close')" class="i-termsdialog-closebtn">Close</div>
          </div>
        </div>
    </div>
    </q-dialog>

</template>

<style>
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
.i-main-middle-logo-term{
  display: flex;
  width: 100%;
  height: 200px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-image:    url("/statics/IG_Page_Banner.jpg");
  background-size: cover;
  background-repeat:   no-repeat;
  background-position: center center
}
.i-termsdialog-closebtn {
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
.i-termsdialog-body{
  display: flex;
  flex-direction: column;
  height: 100%;
}
.i-termsdialog-body-60-label{
font-family: Roboto;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 168.5%;
color: #000000;
}
.i-termsdialog-body-60-line{
font-family: Roboto;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 168.5%;
color: #000000;
}
.i-termsdialog-body-60{
  padding: 20px 30px;
  display: flex;
  height: 70%;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
}
.i-termsdialog-body-40{
  display: flex;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.i-termsdialog-close-icon{
  position:absolute;
  right:0px;
}
.i-termsdialog-label{
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
.i-termsdialog-body{
  background: white;
  height:100vh;
}
.i-termsdialog-close{
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

.i-termsdialog-container{
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0px 4px 30px #8E9EAE!important;
  min-width: 70vw;
  max-width: 80vw;
}
.i-term-scroll{
  height: 100%;
    min-width: 60vw;
    max-width: 65vw;
  padding-right:20px;
}

  .i-termsdialog-container{
    max-width: 70vw!important;
  }
@media only screen and (max-width: 1100px) {
  .i-term-scroll{
  min-width: 90vw;
  max-width: 90vw;
}
.i-termsdialog-body {
    height: 95vh;
}
  .i-termsdialog-container{
    max-width: 100vw!important;
  }
}
</style>

<script>
import terms from '../components/terms'

export default {
  name: 'termsdialog',
  components: {
    terms: terms
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
  computed: {
    contentStyle () {
      return {
      }
    },
    contentActiveStyle () {
      return {
      }
    },
    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#58595B',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  created: function () {
    var me = this
    me.dialogOpen = me.open
  },
  methods: {
    onResize (size) {
      var me = this
      if (size.width < 1100) {
        me.maximizedToggle = true
      } else {
        me.maximizedToggle = true
      }
    }
  }
}
</script>
