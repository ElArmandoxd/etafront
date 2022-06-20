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
            </ion-item>
          </ion-list>
        </div>
        <div v-else>
          No hay productos en el carrito
        </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonButton } from '@ionic/vue';
import axios from 'axios';

export default  {
  name: 'Tab3',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonItem, IonAvatar, IonLabel, IonButton },
  data(){
    return{
        cart: {},
      }
  },
  created(){
    this.getCart();
  },
  methods:{
    getCart(){
      let item = localStorage.getItem('User')
      axios.get('http://localhost:3000/cart/'+item)
      .then(response =>{
        this.cart = response.data;
      })
      .catch( error =>{
        console.log(error);
      });
    },
    increase(product){
      let index = this.cart.indexOf(product);
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