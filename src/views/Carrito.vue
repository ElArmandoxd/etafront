<template>
    Carrito
</template>
<script>
export default {
    data(){
        return{ 

        }
    },
    created(){
        this.getProductos()
    },
    methods:{ 
        getProductos(){
            let item = localStorage.getItem('User')
            console.log(item)
        }
    }
}
</script>