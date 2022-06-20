<template>
    {{producto.name}}
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{ 
            producto: null
        }
    },
    created(){
        this.getProducto();
    },
    methods:{ 
        getProducto(){
            let id = this.$route.params.id
            axios.get('http://localhost:3000/api/products/'+id)
            .then(response =>{
                this.producto = response.data;
            })
        },
    }
}
</script>