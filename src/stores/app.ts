// Utilities
import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify'

export const useAppStore = defineStore('app', {
  state: () => ({ drawer: !useDisplay().mobile.value, mobile: false, dialog: false, drawerNotify: false }),
  actions: {
    actionDrawer () {
      this.drawer = false
    },
    actionDrawerMobile () {
      this.drawer = !this.drawer
      this.drawerNotify = this.drawerNotify ? false : this.drawerNotify
    },
    validateDispleyMobile () {
      this.mobile = useDisplay().mobile.value
      if (!this.mobile && this.drawer) {
        this.drawer = !this.mobile
      }
    },
    actionDialog () {
      this.dialog = !this.dialog
    },
    actionDrawerNotify () {
      this.drawerNotify = !this.drawerNotify
      this.drawer = this.drawer && this.mobile ? false : this.drawer
    },
  },
})
