import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import MainLayout from './layouts/mainlay.vue'
import AuthLayout from './layouts/authlay.vue'

import HomePage from '../components/mainComponent.vue'
import LoginComponent from '../components/LoginRegister/login.vue'
import RegisterComponent from '../components/LoginRegister/registerComponent.vue'
import ProfilePage from '../components/profile.vue'
import NotFoundPage from '../components/404okak.vue' // <--- новый импорт

import { useUserStore } from '../stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/app/home',
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginComponent,
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomePage,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfilePage,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'NotFound',
        component: NotFoundPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
