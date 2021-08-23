<template>
 <q-dialog v-model="dialogOpen" :square="true" @hide="$emit('close')"
 persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-resize-observer @resize="onResize" />
     <div class="i-watch-container" >
       <div class="i-watch-close">
       <q-btn icon="close" flat round dense v-close-popup @click="$emit('close')" />
       </div>
        <div class="i-watch-item">
          <div class="i-watch-img">
            <!--<q-img v-if="item"
                :src="getItemImageUrl(item.id)"
                spinner-color="grey-5"
                class="i-watch-grmoroi"
              />-->
            <img v-if="item" class="t-watch-pic" :src="getItemImageUrl(item.no)"/>
          </div>
          <div class="i-watch-body" v-if="Object.keys(itemDetail).length !== 0">
            <div class="i-watch-body-line q-mb-sm i-watch-body-line-title">
               {{itemDetail.description}}
            </div>
            <div class="i-watch-pop-price">Price:
              <span v-if="item.originalPrice" style="text-decoration:line-through"> ${{item.originalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}}</span>
              <span style="color:#CD3041;margin-left: 10px;">${{item.price.toLocaleString(undefined, {minimumFractionDigits: 2})}} </span>
            </div>

            <div class="i-watch-pop-no" v-if="item.price - guarantee.confirmedBalance > 0">
              Amount owed:  ${{(item.price - guarantee.confirmedBalance).toLocaleString(undefined, {minimumFractionDigits: 2})}}
            </div>
            <div class="i-watch-pop-no" v-if="item.price - guarantee.confirmedBalance < 0">
              Amount owed: no payment required
            </div>
            <div class="i-watch-pop-no">
            model {{item.no}}
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Collection:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.productCollection}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Gender:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.gender}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Case Size (mm):
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.caseSize}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Case Material:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.caseMaterial}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Crystal Type:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.crystalType}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Movement Caliber:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.movementCaliber}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Function Type:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.functionType}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Dial Material:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.dialMaterial}}
              </div>
            </div>
             <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Bezel Material:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.bezelMaterial}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Crown Type:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.crownType}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Brand:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.brand}}
              </div>
            </div>
            <div class="i-watch-body-line">
              <div class="i-watch-body-line-left">
                Water Resistance:
              </div>
              <div class="i-watch-body-line-right">
               {{itemDetail.waterResistance}}
              </div>
            </div>
            <div class="i-watch-body-line" style="justify-content: flex-end;">
              <div class="i-cancel-btn q-mr-sm" @click="$emit('close')">Cancel</div>
             <div class="i-proceed-btn" @click="$emit('proceed')">Proceed</div>

            </div>
          </div>
      </div>
    </div>
        <!--<q-card class="i-dialog" v-if="item">
        <q-card-section class="row items-center i-dialog-section">
          <div class="text-h6"></div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="$emit('close')"/>
        </q-card-section>

        <q-card-section>
         div class="q-px-lg q-pb-md">
             {{no}}
            <qrcode :value="contact.id" :options="{ width: 300 }"></qrcode>
          </div>
        </q-card-section>
      </q-card>-->
    </q-dialog>

</template>

<style>
.i-proceed-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #FFF200;
  text-transform: uppercase;
  font-size: 15px;
  color: #58595B;
  font-weight: bold;
  height: 40px;
  cursor: pointer;
  margin-top: 20px;
  width: 110px;
}
.i-cancel-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #F2F2F2;
  text-transform: uppercase;
  font-size: 15px;
  color: #58595B;
  font-weight: bold;
  height: 40px;
  cursor: pointer;
  margin-top: 20px;
  width: 110px;
}
.i-watch-body-line{
    font-family: RobotoRegular;

}
.i-watch-body-line-title{
  font-family: RobotoRegular;
text-transform: uppercase;
 font-size:18px;

}
.i-watch-pop-no{
font-family: RobotoRegular;
  font-style: normal;
font-weight: 300;
  font-size: 14px;
line-height: 16px;
text-transform: uppercase;
  color: #58595B;
  padding-top:5px;
}
.i-watch-pop-price{
  font-family: RobotoRegular;
  font-style: normal;
font-weight: 300;
font-size: 24px;
line-height: 28px;
text-transform: uppercase;
  color: #58595B;
}
.i-watch-pic{
max-width: 300px;
    max-height: 300px;
    width: auto;
    height: auto;
}
.i-watch-close{
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
  padding:3px;
}
.i-watch-container{
  display: flex;
  flex-direction: column;
  outline:9px solid #FFF200;
  background: white;
  max-width: 800px!important;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
.i-watch-item{
  display: flex;
  flex-direction: row;
  padding: 20px;
  padding-top:0px;
}
.i-dialog{
  border:10px solid #333333;
}
.i-dialog-section{
  padding-top:1px;
}
.i-watch-img{
  width:50%;
  justify-content: center;
  display: flex;
  align-items: center;
}
.i-watch-body{
  display:flex;
  flex-direction: column;
  justify-content:center;
}
.i-watch-body-line{
  display:flex;
  flex-direction: row;
  padding-bottom:3px;
}
.i-watch-body-line-left{
  display: flex;
  flex-direction: row;
  width: 60%;
  padding-right: 4px;
  justify-content: flex-end;
  color:#818181;
}
.i-watch-body-line-right{
  display: flex;
  flex-direction: row;
  width: 80%;
  color:#58595B;
  font-weight: bold;
}
.i-watch-body-line-title{
font-weight: bold;
}
  .t-watch-pic{
    max-height: 75vh;
    max-width: 100%;
  }
@media only screen and (max-width: 600px) {
 .i-watch-item{
   flex-direction:column;
 }
 .i-watch-img{
   width: 100%;
 }
 .i-watch-body-line-left{
   justify-content: end;
 }
 .i-watch-body{
   padding-top: 20px;
   font-size:12px;
 }
 .i-watch-body-line{
  padding-bottom:0px;
}
.i-watch-container{
   max-width: 100%!important;
}
}
@media only screen and (max-width: 420px) {
  .t-watch-pic{
    max-height: 25vh;
    max-width: 100%;
  }
}
</style>

<script>
import itemService from '../app/services/itemservice'
import userData from '../app/services/userdata'

export default {
  name: 'Watch',
  components: {
  },
  props: ['item', 'open', 'guarantee'],
  data () {
    return {
      isMobile: false,
      contact: {
        id: ''
      },
      itemDetail: {

      },
      dialogOpen: false,
      maximizedToggle: this.$q.platform.is.mobile
    }
  },
  watch: {
    'open': function (val) {
      console.log('open: ' + open)
      var me = this
      if (val === true) {
        me.$q.loading.show()
        console.log(me.item)
        itemService.getItemDetails(me.item.no).then((response) => {
          console.log('item detail: ')
          console.log(response)
          me.itemDetail = response
          me.dialogOpen = val
        }, (error) => {
          console.error(error.message)
          me.dialogOpen = false
        }).then(() => {
          me.$q.loading.hide()
        })
      } else {
        me.dialogOpen = false
      }
      console.log(me.item)
    }
  },
  created: function () {
    var me = this
    var contact = userData.getUserData()
    if (contact) {
      me.contact = contact
    }
  },
  methods: {
    onResize (size) {
      var me = this
      if (size.width < 400) {
        me.isMobile = true
      } else {
        me.isMobile = false
      }
    },
    getItemImageUrl (id) {
      return process.env.API + '/images/item/' + id
    }
  }
}
</script>
