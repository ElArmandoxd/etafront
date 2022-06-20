<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Empresas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Empresas afiliadas</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <empres v-for="c in companies" :key="c._id" :p="c"/>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import empres from '../components/empres.vue';
import axios from 'axios';

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, empres},
  data(){
    return{
      companies: null
    }
  },
  created(){
    this.getCompanies()
  },
  methods:{
    getCompanies(){
      axios.get('http://localhost:3000/api/companies')
      .then(response =>{
        this.companies = response.data;
      })
      .catch( error =>{
        console.log(error);
      });
    }
  }
}
</script>