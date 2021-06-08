<template>
  <v-app id="inspire">
    <v-app-bar color="yellow darken-1" class="black--text" app>
      <div class="d-flex justify-space-around" style="width: 100%">
        <v-toolbar-title>Toptancim</v-toolbar-title>
        <div>
          <v-autocomplete
            v-model="sModel"
            :items="sFiltered"
            :loading="sIsLoading"
            :search-input.sync="sSearch"
            chips
            clearable
            hide-details
            hide-selected
            item-text="name"
            item-value="symbol"
            label="Search for a supplier..."
            solo
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Search for your favorite
                  <strong>supplier</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attr, on, item, selected }">
              <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                v-on="on"
              >
                <v-icon left> mdi-bitcoin </v-icon>
                <span v-text="item.CompanyName"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="text-h5 font-weight-light white--text"
              >
                {{ item.CompanyName.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.CompanyName"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.urunsayisi"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-bitcoin</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
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
  data: () => ({ drawer: null,
  sModel:null,
  sItems:[],
  sFiltered:[],
  sIsLoading:false,
  sSearch:""

  }),
  computed: {
    ...mapGetters(["loginData"]),
  },
  beforeMount(){
    this.axios.get("/user/suppliers").then((res)=>{
      let {suppliers} = res.data;
      console.log(suppliers);
      this.sItems = suppliers;
      this.sFiltered = this.sItems;
    })
  },
  methods: {
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
      sSearch () {
        // Items have already been loaded
        
        let items = this.sItems.filter((item)=>{
          console.log(item.CompanyName.toLowerCase().includes(this.sSearch));
          return item.CompanyName.toLowerCase().includes(this.sSearch);
        })
        this.sFiltered = items
        this.$forceUpdate();
      },
  },
};
</script>