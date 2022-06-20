<template>
  <ion-card>
    <img :src="p.image" alt="" />
    <ion-card-header>
      <ion-card-subtitle>{{p.company_name}}</ion-card-subtitle>
      <ion-card-title>{{p.name}}</ion-card-title>
    </ion-card-header>
    <ion-card-content> {{p.description}}</ion-card-content>
    <ion-button expand="block" v-on:click="addToCart(p)"> compra por: ${{p.price}}.00 mxn</ion-button>
  </ion-card>
</template>
<script>
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButton,
  alertController
} from "@ionic/vue";
import axios from 'axios';

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonButton,
  },
  props: ['p'],
  data() {
    return {};
  },
  created() {
    console.log(this.p)
  },
  methods: {
    addToCart(product){
      console.log(product)
      let item = localStorage.getItem('User');
      axios.post('http://localhost:3000/cart/addProduct/'+ item, product)
      .then(response =>{
        console.log(response.data);
        this.presentAlert(product);
      })
    },
    async presentAlert(p) {
        const alert = await alertController
            .create({
                cssClass: 'my-custom-class',
                header: '¡'+p.name+ ' agregado al carrito!',
                subHeader: 'Nuevo producto',
                message: 'Producto agregado al carrito de compras, ve a la sección de carrito para realizar el pago',
                buttons: ['OK'],
                });
            await alert.present();
            const { role } = await alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);
        },
  },
};
</script>