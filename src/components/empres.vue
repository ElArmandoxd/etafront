<template>
  <ion-card>
    <img :src="p.logo" alt="" />
    <ion-card-header>
      <ion-card-subtitle>{{p.category}}</ion-card-subtitle>
      <ion-card-title>{{p.company_name}}</ion-card-title>
    </ion-card-header>

    <ion-card-content>{{p.description}} </ion-card-content>
    <a :href="'/empresa/'+p._id"><ion-button expand="block">Ver perfil</ion-button> </a>
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
} from "@ionic/vue";

export default {
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonButton,
  },
  props: ["p"],
  data() {
    return {};
  },
  created() {
    console.log(this.p)
  },
  methods: {

  },
};
</script>