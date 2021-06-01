<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex align-self-start xs12 sm8 md4>
        <div class="d-flex justify-space-between">
          <v-btn
            :class="selected == 'login' && 'active'"
            :elevation="selected == 'login' ? 0 : 20"
            width="50%"
            @click="selected = 'login'"
            >Login</v-btn
          >
          <v-btn
            :class="selected == 'register' && 'active'"
            :elevation="selected == 'register' ? 0 : 20"
            width="50%"
            @click="selected = 'register'"
            >Register</v-btn
          >
        </div>

        <v-card v-show="selected == 'login'" class="mt-3 elevation-12">
          <v-toolbar dark color="red darken-3">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
             <v-alert color="deep-orange darken-1" class="white--text" v-if="error">
            <h3><v-icon class="white--text">mdi-alert</v-icon> Email or password incorrect</h3>
          </v-alert>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                label="Email"
                v-model="login.email"
                type="email"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                label="Password"
                v-model="login.password"
                type="password"
                @keydown.enter="signIn"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-3"
              width="25%"
              class="white--text"
              @click="signIn"
              >Login <v-spacer></v-spacer> <v-icon> mdi-login </v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
        <v-card v-show="selected == 'register'" class="mt-3 elevation-12">
          <v-toolbar dark color="red darken-3">
            <v-toolbar-title>Register form</v-toolbar-title>
          </v-toolbar>
      
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                label="Email"
                v-model="register.email"
                type="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                label="Company Name"
                v-model="register.companyName"
                type="text"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                label="Adress"
                v-model="register.adress"
                type="adress"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                label="Tel"
                v-model="register.tel"
                type="tel"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                label="Password"
                v-model="register.password"
                type="password"
                @keydown.enter="signUp"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-3"
              width="25%"
              class="white--text"
              @click="signUp"
            >
              Register <v-spacer></v-spacer> <v-icon> mdi-account-plus </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        companyName: "",
        adress: "",
        tel: "",
      },
      error: false,
      selected: "login",
    };
  },
  methods: {
    ...mapActions(['setLogin'])
    ,
    signIn() {
      const { email, password } = this.login;
      this.axios
        .post("/user/login", { email, password })
        .then(({ data }) => {
          if (data.error) {
            this.error = true;
          } else {
             this.setLogin(data)
            this.$router.push("/dashboard");
            console.log(data);     
          }
        });
    },
    signUp() {
      const { email, password, companyName, adress, tel } = this.register;
      let userData = { email, password, companyName, adress, tel };
      this.axios
        .post("/user/register", { userData })
        .then(({ data }) => {
          if (data.error) {
            this.error = true;
          } else {
            this.login.email = this.register.email;
            this.login.password = this.register.password;
            this.signIn();
          }
        });
    },
  },
};
</script>

<style scoped>
.active {
  border-bottom: red 5px solid;
}
</style>