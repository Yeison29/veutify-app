// Utilities
import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify'

export const useAppStore = defineStore('app', {
  state: () => ({ drawer: !useDisplay().mobile.value }),
  actions: {
    actionDrawer () {
      this.drawer = false
    },
    actionDrawerMobile () {
      this.drawer = !this.drawer
    },
    validateDispleyMobile () {
      this.drawer = !useDisplay().mobile.value
    },
  },
})
