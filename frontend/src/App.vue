<template>
  <v-app id="inspire">

    <v-app-bar color="blue darken-3" class="white--text" app>
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Toptancim</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-3" elevation="20" class="white--text"  to="/login">
        Login <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: null }),
  }
</script>