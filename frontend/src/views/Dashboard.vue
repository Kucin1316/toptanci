<template>
<v-container> 
    <h1>Test Dashboard</h1>
    <p> {{loginData.token}} </p>

 
</v-container>

</template>

<script>
 
import { mapGetters }  from 'vuex';
export default {

computed: { 
   ...mapGetters(['loginData'])
},

}
</script>

<style>

</style>