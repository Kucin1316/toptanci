<template>
  <v-app id="inspire">
    <v-app-bar color="yellow darken-1" class="black--text" app>
      <div class="d-flex justify-space-around align-center" style="width: 100%">
        <div>
          <v-toolbar-title>Toptanwsdsdfcim</v-toolbar-title>
        </div>
        <div class="mt-7">
          <v-combobox placeholder="Suppliers..." :items="items" clearable solo>
            <template v-slot:item="{ index, item }">
              <p :key="index" @click="$router.push('/supplier/'+item.id)" >{{item.companyName}} </p>
            </template>
<template v-slot:selection="{ index, item }">
{{item.companyName}} 🚀
</template>
          </v-combobox>
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
    items:[]
  }),
  computed: {
    ...mapGetters(["loginData"]),
  },
  beforeMount() {
    this.axios.get('/user/suppliers').then(({data})=>{
      this.items = data.suppliers;
    })
  },
  methods: {
    logOut() {
      this.setLogin();
      this.$router.push("/login");
    },
    log(id){
      console.log(id);
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