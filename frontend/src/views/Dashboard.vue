<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Test Dashboard</h1>
        <p>{{ loginData.token }}</p>
      </v-col>
    </v-row>
    <v-card class="yellow darken-2 pa-3">
      <v-row>
        <v-col>
          <v-autocomplete
            solo
            item-value="id"
            item-text="companyName"
            placeholder="Search a supplier"
            v-model="selectedSupplier"
            :items="items"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    beforeMount(){
        this.axios.get("/user/suppliers").then(({data})=>{
         data.suppliers = data.suppliers.filter((item)=>{
            return item.id != this.userData.id
          })
            this.items = data.suppliers
        })
    },
  data() {
    return {
      selectedSupplier: null,
      items: [],
    };
  },
  computed: {
    ...mapGetters(["loginData","userData"]),
  },
  watch:{
      selectedSupplier(id){
          this.$router.push(`/supplier/${id}`)
          
      }
  }
};
</script>

<style>
</style>