<template>
  <div >
    <q-stepper
      v-model="step"
      ref="stepper"
      alternative-labels
      inactive-color="grey-4"
      animated
      flat :vertical="width<600"
    >
      <q-step class="i-active"
        :name="1"
        title="Enter Guarantee number"
        prefix="1"
      >
      </q-step>

      <q-step class="i-active"
        :name="2"
        title="Send us your watch"
        prefix="2"
      >
      </q-step>

      <q-step
        :name="3"
        prefix="3"
        title="Select new watch"
      >
      </q-step>
     <!-- <q-step
        :name="4"
        prefix="4"
        title="Enter your address"
      >
      </q-step>-->
      <q-step
        :name="4"
        prefix="4"
        title="Check out"
      >
      </q-step>
      <q-step
        :name="5"
        prefix="5"
        title="Enjoy new watch!"
      >
      </q-step>
    </q-stepper>
  </div>
</template>

<style>
.q-stepper__title{
  color:black;
}
.q-stepper--horizontal .q-stepper__line:before, .q-stepper--horizontal .q-stepper__line:after{
  background: #7574743d;
}
.q-stepper{
  background: none;
}
.q-stepper__dot{
  height:40px;
  width:40px;
  font-size: 20px;
  font-family: RobotoRegular;
}
.q-stepper__title{
  font-family: RobotoRegular;
}
.q-stepper__dot span{
  color:#000000;
}

.q-stepper--horizontal .q-stepper__tab:nth-child(1){
  color:#FFF200!important;
}

@media only screen and (max-width: 900px) {

}
@media only screen and (max-width: 600px) {
  .q-stepper__content{
    display: block;
  }
  .q-stepper--vertical .q-stepper__dot:before, .q-stepper--vertical .q-stepper__dot:after {
    background: #DADADA;
  }
  .q-stepper__step.i-active .q-stepper__tab{
  color:#FFF200!important;
  }
}
</style>

<script>

export default {
  name: 'StepperLayout',
  components: {
  },
  props: ['width'],
  data () {
    return {
      step: 0
    }
  },
  created: function () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
