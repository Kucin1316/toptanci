<template>
  <v-container>
    <v-row>
      <v-col  v-for="product in products"  :key="product.id" cols="3">
        <v-card width="18rem">
          <h1>{{ product.name }}</h1>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  beforeMount() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      let res = await this.axios.get("/product");
      let products = res.data.products;
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