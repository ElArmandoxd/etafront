<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Carrito</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Carrito</ion-title>
        </ion-toolbar>
      </ion-header>
        <div v-if="cart.length > 0">
          <ion-list>
            <ion-item v-for="p in cart" :key="p.product._id">
              <ion-avatar>
                <img :src="p.product.image" alt="">
              </ion-avatar>
              <ion-label>{{p.product.name}}</ion-label>
              <ion-button v-on:click="decrease(p)">-</ion-button>
              <ion-label>cantidad: {{p.amount}}</ion-label>
              <ion-button v-on:click="increase(p)">+</ion-button>
              <ion-label>${{p.product.price * p.amount}}</ion-label>
            </ion-item>
          </ion-list>
          <div>
            <stripe-checkout ref="checkoutRef"
            :success-url="successURL"
            :cancel-url="cancelURL"
            :lineItems="lineItems"
            :pk="publishableKey"
            mode="payment"
            :testMode="true" />
          </div>
          <div>
            <ion-button expand="block" v-on:click="submit">Pagar con Stripe</ion-button>
          </div>
        </div>
        <div v-else>
          No hay productos en el carrito
        </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonButton } from '@ionic/vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import axios from 'axios';

export default  {
  name: 'Tab3',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonAvatar, IonLabel, IonButton , StripeCheckout,},
  data(){
    this.publishableKey = "pk_test_51LCnmzJepGHdBHcG4vSNwCKDHFEYslAfo6tTx49CLVMNKA6rAPSeLPyKxcJO7MUwQ0kEvVaKXTJjAppcn1ctq8UH00q1OmomQ4"
    return{
        cart: {},
        successURL: 'http://localhost:8100/tabs/success',
        cancelURL: 'http://localhost:8100/tabs/tab3',
        lineItems: []

      }
  },
  created(){
    this.getCart();
  },
  methods:{
    submit(){
      console.log(this.lineItems)
      console.log(this.cart[0].product.sripe_price)
      this.$refs.checkoutRef.redirectToCheckout();
    },
    getCart(){
      let item = localStorage.getItem('User')
      axios.get('http://localhost:3000/cart/'+item)
      .then(response =>{
        this.cart = response.data;
        console.log(this.cart)
        for(let i = 0; i < this.cart.length; i++){
          let cart_item = {
            price: this.cart[i].product.stripe_price,
            quantity: this.cart[i].amount
          }
          this.lineItems.push(cart_item);
        }
      })
      .catch( error =>{
        console.log(error);
      });
    },
    increase(product){
      let index = this.cart.indexOf(product);
      this.lineItems[index].quantity ++;
      this.cart[index].amount ++;
    },
    decrease(product){
      let index = this.cart.indexOf(product);
      if(this.cart[index].amount == 0){
        this.cart.splice(index, 1);
      }
      else{ 
        this.cart[index].amount --;
      }
    }
  }
}
</script>