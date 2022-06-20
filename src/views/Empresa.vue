<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ company.company_name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-grid>
          <ion-toolbar>
            <ion-row>
              <ion-col size="1.5">
                <ion-avatar>
                  <img :src="company.logo" alt="" />
                </ion-avatar>
              </ion-col>
              <ion-col>
                <ion-title size="large">{{ company.company_name }}</ion-title>
              </ion-col>
              <ion-col size="12">
                <h5>{{company.description}}</h5>
              </ion-col>
            </ion-row>
          </ion-toolbar>
        </ion-grid>
      </ion-header>
      <product v-for="p in products" :key="p._id" :p="p" />
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
} from "@ionic/vue";
import product from "../components/product.vue";
import axios from "axios";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    product,
    IonAvatar,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      company: {},
      products: null,
    };
  },
  created() {
    let _id = this.$route.params.id;
    this.getEmpresa(_id);
  },
  methods: {
    getEmpresa(id) {
      console.log(id);
      axios
        .get("http://localhost:3000/api/companies/" + id)
        .then((response) => {
          this.company = response.data;
          console.log(this.company);
          this.getProductos(id);
        });
    },
    getProductos(id) {
      console.log(id);
      axios
        .get("http://localhost:3000/api/company/" + id + "/products")
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
        });
    },
  },
};
</script>