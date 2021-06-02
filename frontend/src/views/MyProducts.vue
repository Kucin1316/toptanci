<template>
  <v-container>
    <!-- <v-row>
      <v-col  v-for="product in products"  :key="product.id" cols="3">
          <ProductCard/>
      </v-col>
    </v-row> -->
    <ProductCard :items="products"/>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProductCard from "../components/common/ProductCard";
export default {
  components:{
    ProductCard
  },
  beforeMount() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      let res = await this.axios.get("/product");
      let products = res.data.products;
      console.log(res);
      this.setProducts(products);
    },
    ...mapActions(["setProducts"]),
  },
  computed: {
    ...mapGetters(["products"]),
  },
};
</script>

<style>
</style>