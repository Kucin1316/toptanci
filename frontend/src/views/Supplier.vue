<template>
  <v-container>
    <v-card class="d-flex yellow darken-1 black--text ">    
       <v-btn icon>
            <v-icon> mdi-arrow-left </v-icon>
          </v-btn>
      <v-container>
        <v-row>
          <v-col>
            <h1>Kaplan Pazarlama</h1>  <v-icon>mdi-market</v-icon>
            <p class="font-weight-thin subtitle-2">
           <v-icon>mdi-store-outline</v-icon> Yakacık Mah. Selami Sok. No:25 Alaçam/Samsun
            </p>
          </v-col>
          <v-col>
              <p class="overline">
               <v-icon>mdi-phone</v-icon> +905434296967
              </p>
               <p class="overline">
               <v-icon>mdi-clock</v-icon> 08.00-19.00
              </p>  
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-divider></v-divider>
    <v-card class="mt-4">
         <ProductCardTable :items="products"/>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductCardTable from "../components/common/ProductCardTable";
export default {
  components:{
    ProductCardTable
  },
  beforeMount() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      let res = await this.axios.get("/product?userId="+this.$route.params.id);
      let products = res.data.products;
      console.log(res);
      this.setProducts(products);
    },
    ...mapActions(["setProducts"]),
  },
  computed: {
    ...mapGetters(["products"]),
  },
  watch:{
      "$route.params.id": function(){
          this.getProducts()
      }
  }
};
</script>

<style>
</style>