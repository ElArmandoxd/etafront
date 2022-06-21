import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    component: ()=> import('@/views/Login.vue')
  },
  {
    path: '/register',
    component: ()=> import('@/views/Register.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        name:'mainTabs',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      },
      {
        name: 'producto',
        path: '/producto/:id',
        component: () => import('@/views/Producto.vue')
      },
      {
        name: 'empresa',
        path: 'empresa/:id',
        component: () => import('@/views/Empresa.vue')
      },
      {
        name: 'success',
        path: 'success',
        component: () => import('@/views/Success.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
