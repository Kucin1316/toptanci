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
    supplierId:null,
    cart:{
      9:[
        {name:"selo"}
      ]
    /*   34:[
        {
          productId: 100,
          amount: 1,
          priceNet: 10,
          priceGross: 12,
          tax: 5.00
        },
      ] */
    }
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
    },
    setCart(state,data={}){
      state.cart = data;
    },
    addItemToCart(state,data){
     //{id:35,item:{}}
     state.cart[data.id].push(data.item)
    },
    deleteItemToCart(state,data){
       //{id:35,index:5}
      state.cart[data.id].splice(data.index,1)
    },
    setSupplierId(state,data){
      state.supplierId = data;
    }
  },
  actions: {
    setLogin({commit},data={user:{},token:"",isLogin:false}){
      commit("setUserData",data.user)
      commit("setToken",data.token)
      commit("setIsLogin",data.isLogin);
    //  commit("setCart");
    },
    setProducts({commit},data){
      commit("setProducts",data)
    },
    addItemToCart({commit},data){
      commit("addItemToCart",data)
    },
    deleteItemToCart({commit},data){
      commit("deleteItemToCart",data)
    },
    setSupplierId({commit},data){
      commit("setSupplierId",data)
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
    },
    cart({supplierId,cart}){
      return cart[supplierId] || []
    }
  },
  plugins:[vuexLocal.plugin]
})
