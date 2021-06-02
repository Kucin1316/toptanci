<template>
  <v-app id="inspire">

    <v-app-bar color="blue darken-3" class="white--text" app>
      

      <v-toolbar-title>Toptancim</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!loginData.isLogin" color="blue darken-3" elevation="20" class="white--text"  to="/login">
        Login <v-icon>mdi-login</v-icon>
      </v-btn>
        <v-btn v-if="loginData.isLogin" color="blue darken-3" elevation="20" class="white--text" @click="logOut">
        Logout <v-icon>mdi-login</v-icon>
      </v-btn>
     <v-btn  class="white--text" @click="drawer = !drawer" icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      right
      fixed
      temporary
    >
      <h1>Selami Sahin</h1>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

  export default {
    data: () => ({ drawer: null }),
    computed:{
      ...mapGetters(['loginData'])
    },
    methods:{
      logOut(){
        this.setLogin();
      },
      ...mapActions(['setLogin'])
    },
    watch:{
      "loginData.isLogin":()=>{
        if(!this?.loginData.isLogin){
          this?.$router.push('/login')
        }
      }
    }
  }
</script>