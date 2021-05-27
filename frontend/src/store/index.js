import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key:"app-data"
})
 
export default new Vuex.Store({
  state: {
    token:"",
    user:{},
    isLogin:false
  },
  mutations: {
    setToken(state,token){
      state.token = token;
    },
    setUserData(state,userData){
      state.user = userData;
    },
    setIsLogin(state,data){
      state.isLogin = data;
    }
  },
  actions: {
    setLogin({commit},data){
      commit("setUserData",data.user)
      commit("setToken",data.token)
      commit("setIsLogin",true);
    }
  },
  getters:{},
  plugins:[vuexLocal.plugin]
})
