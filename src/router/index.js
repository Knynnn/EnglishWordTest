import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Kaoyan_Vocabulary',
    name: 'Kaoyan',
    component: () => import(/* webpackChunkName: "about" */ '../views/KaoyanView.vue')
  },
  {
    path: '/Cet-4_Vocabulary',
    name: 'Cet-4',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cet-4View.vue')
  },
  {
    path: '/Cet-6_Vocabulary',
    name: 'Cet-6',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cet-6View.vue')
  },
  {
    path: '/My_Vocabulary',
    name: 'My_Vocabulary',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
