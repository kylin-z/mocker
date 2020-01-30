import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Rules from '../views/Rules.vue'
import Modules from '../views/Modules.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/rules',
    name: 'rules',
    component: Rules
  },
  {
    path: '/modules',
    name: 'modules',
    component: Modules
  },
]

const router = new VueRouter({
  routes
})

export default router
