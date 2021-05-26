<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
     
      
      <v-flex  xs12 sm8 md4>
        <v-btn @click="selected='login'">Login</v-btn>
      <v-btn @click="selected='register'">Register</v-btn>
        <v-card v-show="selected=='login'" class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-alert color="warning" v-if="error">
            <h2> <v-icon>mdi-alert</v-icon>  Email or password incorrect </h2>
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
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn">Login</v-btn>
          </v-card-actions>
        </v-card>
          <v-card v-show="selected=='register'" class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Register form</v-toolbar-title>
          </v-toolbar>
          <v-alert color="warning" v-if="error">
            <h2> <v-icon>mdi-alert</v-icon>  Email or password incorrect </h2>
          </v-alert>
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
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signUp">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data(){
    return {
      login:{
         email:"",
        password:"",
      },
      register:{
        email:"",
        password:"",
        companyName:"",
        adress:"",
        tel:""
      },
      error:false,
      selected:"login"
    }
  },
  methods:{
    signIn(){
      const {email,password} = this.login;
      this.axios.post("http://localhost:85/user/login",{email,password})
      .then(( {data} )=>{
        if(data.error){
          this.error = true;
        }else{
          this.$router.push('/');
        }
      })
    },
    signUp(){
       const {email,password,companyName,adress,tel} = this.register;
       let userData = {email,password,companyName,adress,tel}
      this.axios.post("http://localhost:85/user/register",{userData})
      .then(( {data} )=>{
        if(data.error){
          this.error = true;
        }else{
         console.log(data);
         console.log("Kayıt Başarılı");
        }
      })
    }
  }
}
</script>