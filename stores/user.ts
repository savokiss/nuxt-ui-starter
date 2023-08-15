
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'UserStore',
  state: () => ({ 
    userInfo: {}
  }),
  actions: {
    setUser (user: App.User) {
      this.userInfo = user
    }
  },
})
