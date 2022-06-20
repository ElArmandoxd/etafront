<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Productos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Productos disponibles</ion-title>
        </ion-toolbar>
      </ion-header>
      <!--Producto-->
          <div v-for="p in products" :key="p._id">
            <product :p="p"/>
          </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import product from '../components/product.vue'
import axios from 'axios';

export default  {
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage , product },
  data(){
    return{
      products: null
    }
  },
  created(){
    this.getProducts();
  },
  methods:{
    getProducts(){
      axios.get('http://localhost:3000/api/products')
      .then(response =>{
        this.products = response.data;
      })
      .catch( error =>{
        console.log(error);
      });
    }
  }
}
</script>