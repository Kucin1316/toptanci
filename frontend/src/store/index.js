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
    isLogin:false,
    products:[],
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
    },
    setProducts(state,data){
      state.products = data;
    }
  },
  actions: {
    setLogin({commit},data={user:{},token:"",isLogin:false}){
      commit("setUserData",data.user)
      commit("setToken",data.token)
      commit("setIsLogin",data.isLogin);
    },
    setProducts({commit},data){
      commit("setProducts",data)
    }
  },
  getters:{
    loginData({token,isLogin}) {
      return {token,isLogin}
    },
    products({products}){
      return products;
    },
    userData({user}){
      return user
    }
  },
  plugins:[vuexLocal.plugin]
})
