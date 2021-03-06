<template>
  <v-data-iterator
    :items="items"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"
    hide-default-footer
  >
    <template v-slot:header>
      <v-toolbar dark color="yellow darken-1 " class="mb-1">
        <v-text-field
          v-model="search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        ></v-text-field>
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-spacer></v-spacer>
          <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="keys"
            prepend-inner-icon="mdi-magnify"
            label="Sort by"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn-toggle v-model="sortDesc" mandatory>
            <v-btn large depressed color="blue" :value="false">
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn large depressed color="blue" :value="true">
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>
      </v-toolbar>
    </template>

    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
        <ProductCard :deleteItem="deleteItem" :isMine="isMine" :sortBy="sortBy" :item="item" :keys="keys" />
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <v-row class="mt-2" align="center" justify="center">
        <span class="grey--text">Items per page</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              text
              color="primary"
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ itemsPerPage }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              @click="updateItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span class="mr-4 grey--text">
          Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from './ProductCard.vue';

export default {
  components: { ProductCard },
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isMine: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount() {
    if (!this.isMine) {
      this.keys = ["priceGross", "productId", "amount", "unit"];
    }
    this.items.forEach((item)=>(item.isLoading = false))
  },
  data() {
    return {
      itemsPerPageArray: [10, 25, 50, 100],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      isLoading:false,
      itemsPerPage: 10,
      sortBy: "name",
      keys: [
        "priceNet",
        "tax",
        "priceGross",
        "productId",
        "amount",
        "unit",
        "barcode",
      ],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
    ...mapGetters(["userData"]),
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    async updateProduct(product) {
      this.toggleActive(product.id);
      let data = await this.axios.patch("/product/", { product });
      console.log(data);
      this.toggleActive(product.id);
      console.log(product);
    },
  
      deleteItem(id){
        let index = this.items.findIndex((i)=>{
          return i.id == id;
        });
        this.items.splice(index,1)
      }
  
  },
};
</script>
<style>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  height: 0 !important;
}
</style>