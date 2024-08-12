// Utilities
import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify'

export const useAppStore = defineStore('app', {
  state: () => ({ drawer: !useDisplay().mobile.value, mobile: false }),
  actions: {
    actionDrawer () {
      this.drawer = false
    },
    actionDrawerMobile () {
      this.drawer = !this.drawer
    },
    validateDispleyMobile () {
      this.mobile = useDisplay().mobile.value
    },
  },
})
