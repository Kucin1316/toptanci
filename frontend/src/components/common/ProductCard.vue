<template >
  <div v-if="isExist">
    <v-card   :loading="isLoading">
      <div>
        <v-switch
          v-if="isMine"
          :label="item.isActive ? 'Active' : 'Passive'"
          color="success"
          @change="updateProduct(item)"
          v-model="item.isActive"
          hide-details
          :loading="isLoading"
        ></v-switch>
      </div>
      <v-card-title class="subheading font-weight-bold">
        {{ item.name }}
      </v-card-title>

      <v-divider></v-divider>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr v-for="(key, index) in filteredKeys" :key="index">
              <td :class="{ 'blue--text': sortBy === key }">{{ key }}</td>
              <td :class="{ 'blue--text': sortBy === key }">
                {{ item[key] }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="d-flex">
        <template class="d-flex" v-if="isMine">
        
  <v-dialog transition="dialog-top-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
               <v-btn   v-bind="attrs"
                v-on="on" class="blue ma-3 darken-3 white--text" icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-sheet
                class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                color="blue-grey darken-3"
                dark
              >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                  Are you sure you want to delete this album?
                </div>

                <v-btn
                  class="ma-1"
                  color="grey"
                  plain
                  @click="dialog.value = false"
                >
                  Cancel
                </v-btn>

                <v-btn
                  :loading="isLoading"
                  class="ma-1"
                  color="error"
                  plain
                  @click="deleteProduct(item.productId,dialog,item.id)"
                >
                  Delete
                </v-btn>
              </v-sheet>
            </template>
          </v-dialog>
          <v-dialog transition="dialog-top-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                class="red ma-3 darken-3 white--text"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-sheet
                class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                color="blue-grey darken-3"
                dark
              >
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                  Are you sure you want to delete this album?
                </div>

                <v-btn
                  class="ma-1"
                  color="grey"
                  plain
                  @click="dialog.value = false"
                >
                  Cancel
                </v-btn>

                <v-btn
                  :loading="isLoading"
                  class="ma-1"
                  color="error"
                  plain
                  @click="deleteProduct(item.productId,dialog,item.id)"
                >
                  Delete
                </v-btn>
              </v-sheet>
            </template>
          </v-dialog>
        </template>

        <template v-else>
          <v-spacer></v-spacer>
          <v-btn disabled rounded class="yellow ma-3 darken-3"
            >Add to cart <v-icon>mdi-cart</v-icon>
          </v-btn>
        </template>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["item", "isMine", "keys", "sortBy","deleteItem"],
  data() {
    return {
      isActive: false,
      isLoading: false,
      isExist:true
    };
  },
  methods: {
    deleteProduct(productId,dialog,id) {
      this.toggleActive();
      this.axios.delete(`/product/${productId}`).then(({ data }) => {
        console.log(data);
        this.toggleActive();
        dialog.value=false
        this.isExist  = false;
        this.deleteItem(id)
      });
    },
    async updateProduct(product) {
      this.toggleActive();
      let data = await this.axios.patch("/product/", { product });
      console.log(data);
      this.toggleActive();
      console.log(product);
    },
    toggleActive() {
      this.isLoading = this.isLoading ? false : true;
    },
  },
  computed: {
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
};
</script>

<style lang="sass">

</style>