import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    registrationDate: '',
    token: '',
    isAuthenticated: false,
  }),
  getters: {
    user: (state) => ({
      username: state.username,
      registrationDate: state.registrationDate,
      token: state.token,
    }),
  },
  actions: {
    setUser(user: { username: string; registrationDate: string; token?: string }) {
      this.username = user.username
      this.registrationDate = user.registrationDate
      this.token = user.token || ''
      this.isAuthenticated = true
    },
    logout() {
      this.username = ''
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
