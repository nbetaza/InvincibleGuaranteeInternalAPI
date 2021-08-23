<template>
  <div class="i-step">
    <q-stepper
      v-model="step"
      ref="stepper"
      alternative-labels
      inactive-color="grey-11"
      animated
      flat :vertical="width<600"
    >
      <q-step class="i-active"
        :name="1"
        title="Enter Guarantee number"
        prefix="1"
      >
      </q-step>

      <q-step
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
        :name="5"
        prefix="4"
        title="Check out"
      >
      </q-step>
      <q-step
        :name="6"
        prefix="5"
        title="Enjoy new watch!"
      >
      </q-step>
    </q-stepper>
  </div>
</template>

<style>

.q-stepper--horizontal .q-stepper__line:before, .q-stepper--horizontal .q-stepper__line:after{
  background: #cdcdcd;
}
.q-stepper{
  background: none;
}
.q-stepper__dot{
  height:50px;
  width:50px;
  font-size: 20px;
  font-family: RobotoRegular;
}
.q-stepper__title{
  font-family: RobotoRegular;
}
.q-stepper__dot span{
  color:#000000;
}

.q-stepper--horizontal .q-stepper__tab:first-child{
  color:#FFF200!important;
}

.i-step .q-stepper__title{
  color:rgb(245, 245, 245)!important;
}
@media only screen and (max-width: 900px) {
  .i-step  .q-stepper--horizontal{
    padding-bottom: 20%;
  }
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
  .q-stepper--vertical{
    padding-bottom: 40%;
  }
}

</style>

<script>

export default {
  name: 'Stepper',
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
  methods: {
  }
}
</script>
