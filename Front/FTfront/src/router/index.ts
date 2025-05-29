// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import MainLayout from './layouts/mainlay.vue'
import AuthLayout from './layouts/authlay.vue'

import HomePage from '../components/mainComponent.vue'
import LoginComponent from '../components/LoginRegister/login.vue'
import RegisterComponent from '../components/LoginRegister/registerComponent.vue'
import ProfilePage from '../components/profile.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: HomePage,
        meta: { requiresAuth: true },
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
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: LoginComponent },
      { path: 'register', name: 'Register', component: RegisterComponent },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard для авторизации
import { useUserStore } from '../stores/user'

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
