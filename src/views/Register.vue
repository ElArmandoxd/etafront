<template>
    <ion-page>
        <ion-toolbar>
            <ion-title>Registro de usuario</ion-title>
        </ion-toolbar>
        <ion-item>
            <ion-label position="floating">Correo electronico</ion-label>
            <ion-input type="email" v-model="info.email"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Nombre de usuario</ion-label>
            <ion-input type="text"  v-model="info.username"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="floating">Contraseña</ion-label>
            <ion-input type="password" v-model="info.password"></ion-input>
        </ion-item>
        <br>
        <ion-button expand="block" v-on:click="register">Registrarme ahora</ion-button>
        <router-link to="/"><ion-button expand="block">Iniciar sesión</ion-button></router-link>
    </ion-page>
</template>
<script>
import {IonPage, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton, alertController} from '@ionic/vue';
import axios from 'axios';
import router from '../router/index'

export default {
    name: 'Registro',
    components: {
        IonPage, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton
    },
    data(){
        return{
            info: {
                email: null,
                username: null,
                password: null,
            }
        }
    },
    created(){

    },
    methods:{
        register(){
            console.log('intentando registrar');
            axios.post('http://localhost:3000/users/register', this.info )
            .then(response =>{
                console.log(response.data);
                localStorage.setItem('User', response.data._id)
                router.push({ name: 'mainTabs'});
            })
            .catch(error =>{
                console.log(error);
            })
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