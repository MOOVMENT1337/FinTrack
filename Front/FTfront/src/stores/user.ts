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

      // сохраняем ВСЕ данные
      localStorage.setItem('user', JSON.stringify(user))
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
            this.logout() // если данные битые — очищаем
          }
        } catch (e) {
          this.logout() // если JSON не парсится
        }
      }
    },
  },
})
