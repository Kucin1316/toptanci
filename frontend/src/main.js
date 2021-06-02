import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = "http://localhost:85"

axios.interceptors.request.use((config)=>{
  config.headers.token = store.state.token;
  return config;
},
function (error) {
  console.log("sıkıntı çıktı",error);
  return Promise.reject(error);
})

axios.interceptors.response.use((config)=>{
  console.log("HER CEVAP BİZDEN GEÇER",config);
  if(config.data.status == "Permission denied"){
    store.dispatch("setLogin")
  }
  return config;
})

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
