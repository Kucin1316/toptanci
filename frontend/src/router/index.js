import Vue from 'vue'
import VueRouter from 'vue-router'

//import store from "../store";

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import MyProducts from '../views/MyProducts.vue'
import Supplier from '../views/Supplier.vue';
import PageNotFound from '../views/PageNotFound'
import store from '../store'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  {
    path: '/myProducts',
    name: 'MyProducts',
    component: MyProducts,
    meta: {
      auth: true
    }
  },
  {
    path: '/supplier/:id',
    name: 'Supplier',
    component: Supplier,
    meta: {
      auth: true
    }
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    const { token, isLogin } = store.getters.loginData;
    if (token && isLogin) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router
