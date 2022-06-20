<template>
    <ion-page>
        <ion-toolbar>
            <ion-title>Inicio de sesión</ion-title>
        </ion-toolbar>
        <ion-item>
            <ion-label position="floating">Correo electronico</ion-label>
            <ion-input type="email" v-model="info.email"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input type="password" v-model="info.password"></ion-input>
        </ion-item>
        <ion-button expand="block" v-on:click="login">Iniciar sesión</ion-button>
        <router-link to="/register"><ion-button expand="block">Registro</ion-button></router-link>
    </ion-page>
</template>
<script>
import {IonPage, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton, alertController} from '@ionic/vue';
import axios from 'axios'
import router from '../router/index'

export default {
    name:  'Login',
    components: {
        IonPage,
        IonToolbar,
        IonTitle,
        IonItem, 
        IonLabel, 
        IonInput, 
        IonButton
    },
    data(){
        return{
            info:{
                email: null,
                password: null
            }
        }
    },
    created(){
        
    },
    methods:{
        login(){
            axios.post('http://localhost:3000/users/login', this.info )
            .then(response =>{
                console.log(response.data);
                localStorage.setItem('User', response.data._id)
                router.push({ name: 'mainTabs'})
            })
            .catch(error =>{
                console.log(error);
                this.presentAlert();
            });
        },
        async presentAlert() {
        const alert = await alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'Información incorrecta',
                subHeader: 'Error',
                message: 'Verifique la información',
                buttons: ['OK'],
                });
            await alert.present();
            const { role } = await alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);
        },
    }
}
</script>