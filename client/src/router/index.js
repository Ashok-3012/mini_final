import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import SearchTrains from '../views/SearchTrains.vue'
import  BookTicket from '../views/BookTicket.vue'
import  TrainList from '../views/TrainList.vue'
import Admin from '../views/Admin.vue'
import AddTrain from '../views/AddTrain.vue'
import DeleteTrain from '../views/DeleteTrain.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'login',
    component: Login
  },
  {
    path:'/signup',
    name:'signup',
    component: SignUp
  },
  {
    path:'/search',
    name:'search',
    component: SearchTrains
  },
  {
    path:'/book/:train_data',
    name:'book',
    component: BookTicket
  },
  {
    path:'/listtrain/:place',
    name:'listtrain',
    component: TrainList
  },
  {
    path:'/admin',
    name:'admin',
    component: Admin
  },
  {
    path:'/deletetrain',
    name:'deletetrain',
    component: DeleteTrain
  },
  {
    path:'/addtrain/',
    name:'addtrain',
    component: AddTrain
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
