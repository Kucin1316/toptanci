import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true  
    }
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta: {
      auth: true  
    }
  },
  {
    path:'/dashboard',
    name:'Dashboard',
    component:Dashboard,
    meta: {
      auth: true  
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {    
  if (to.meta.auth && this.$store.loginData.token) {
    next('/login')
  }    
  else {
    next()
  }    
})

export default router
