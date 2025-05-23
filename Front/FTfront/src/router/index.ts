// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginRegister/login.vue'
import RegisterComponent from '../components/LoginRegister/registerComponent.vue'

const routes = [
  { path: '/', name: 'Login', component: LoginComponent },
  { path: '/register', name: 'Register', component: RegisterComponent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
