<template>
  <v-app id="inspire">
    <v-app-bar color="yellow darken-1" class="black--text" app>
      <div class="d-flex justify-space-around" style="width: 100%">
        <v-toolbar-title>Toptanwsdsdfcim</v-toolbar-title>
        <div>
          <v-form>
            <v-autocomplete
              v-model="value"
              :items="items"
              dense
              filled
              label="Filled"
            ></v-autocomplete>
          </v-form>
        </div>
        <div>
          <v-btn
            @click="!loginData.isLogin ? $router.push('/login') : logOut()"
            icon
          >
            <v-icon size="32">mdi-login</v-icon>
          </v-btn>
          <v-btn @click="drawer = !drawer" icon>
            <v-icon size="32">mdi-cart</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" right fixed temporary>
      <h1>Selami Sahin</h1>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: null,
    sItems: [],
    sFiltered: [],
    sSearch: "",
    suppliers: [],
    value: null,
  }),
  computed: {
    ...mapGetters(["loginData"]),
     items(){
      return this.suppliers.map((supplier)=>{
        return supplier.companyName;
      })
    }
  },
  beforeMount() {
    this.axios.get("/user/suppliers").then((res) => {
      let { suppliers } = res.data;
      this.suppliers = suppliers.map((supplier) => {
        const { id, companyName } = supplier;
        return { id, companyName };
      });
    });
  },

  methods: {
    searchSupliers() {
      // Items have already been loaded
      console.log(this.sSearch);
      let items = this.sItems.filter((item) => {
        console.log(item.CompanyName.toLowerCase().includes(this.sSearch));
        return item.CompanyName.toLowerCase().includes(this.sSearch);
      });
      this.sFiltered = items;
      console.log(items);
      this.$forceUpdate();
    },
    logOut() {
      this.setLogin();
      this.$router.push("/login");
    },
    ...mapActions(["setLogin"]),
  },
  watch: {
    "loginData.isLogin": () => {
      if (!this?.loginData.isLogin) {
        this?.$router.push("/login");
      }
    },
  },
};
</script>