import { defineStore } from 'pinia'

interface UserPayload {
  username: string
  registrationDate: string
  token: string
}

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
    authHeader: (state) => ({
      Authorization: `Bearer ${state.token}`,
    }),
  },
  actions: {
    setUser(user: UserPayload) {
      this.username = user.username
      this.registrationDate = user.registrationDate
      this.token = user.token
      this.isAuthenticated = true

      localStorage.setItem(
        'user',
        JSON.stringify({
          username: user.username,
          registrationDate: user.registrationDate,
          token: user.token,
        }),
      )
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
        try {
          const parsed = JSON.parse(stored)
          if (parsed.username && parsed.registrationDate && parsed.token) {
            this.setUser(parsed)
          } else {
            this.logout()
          }
        } catch {
          this.logout()
        }
      }
    },

    // ✅ Новый метод
    async fetchUserInfo() {
      try {
        const res = await fetch('/auth/user', {
          headers: this.authHeader,
        })
        if (!res.ok) throw new Error('Ошибка загрузки профиля')
        const data = await res.json()
        this.username = data.username
        this.registrationDate = data.createdAt
      } catch (e) {
        console.error(e)
      }
    },
  },
})
