import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    registrationDate: '',
    token: '',
    isAuthenticated: false,
  }),
  getters: {
    user: (state) => ({
      name: state.name,
      registrationDate: state.registrationDate,
      token: state.token,
    }),
  },
  actions: {
    setUser(user: { name: string; registrationDate: string; token?: string }) {
      this.name = user.name
      this.registrationDate = user.registrationDate
      this.token = user.token || ''
      this.isAuthenticated = true
    },
    logout() {
      this.name = ''
      this.registrationDate = ''
      this.token = ''
      this.isAuthenticated = false
      localStorage.removeItem('user')
    },
    initializeFromLocalStorage() {
      const stored = localStorage.getItem('user')
      if (stored) {
        const parsed = JSON.parse(stored)
        this.setUser(parsed)
      }
    },
  },
})
