<template>
    <div>
        <h1>¡Compra exitosa!</h1>
        <h5>Gracias por comprar en Eta Carinae, para continuar comprando regresa a la página de productos o da click en el boton</h5>
        <div>
            <ion-button expand="block" href="/tabs/tab1" color="success"> Continuar </ion-button>
        </div>
    </div>
</template>
<script>
import { IonButton } from '@ionic/vue'
import axios from 'axios';

export default {
    components: {
        IonButton
    },
    data() {
      return{

      }  
    },
    created(){
        this.deleteCart();
    },
    methods:{
        deleteCart(){
            let item = localStorage.getItem('User')
            axios.get('http://localhost:3000/cart/empty/'+item)
            .then(response =>{
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            });
        }
    }
}
</script>
