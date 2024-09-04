// Utilities
import { defineStore } from 'pinia'
import { useDisplay } from 'vuetify'
import { theme } from '@/plugins/vuetify'

export const useAppStore = defineStore('app', {
  state: () => ({ drawer: !useDisplay().mobile.value, mobile: false, drawerNotify: false, snackbar: { visible: false, message: '', icon: '', color: 'success', timeout: 2000 } }),
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
    actionDrawerNotify () {
      this.drawerNotify = !this.drawerNotify
      this.drawer = this.drawer && this.mobile ? false : this.drawer
    },
    closeMenu () {
      this.drawer = this.mobile ? false : this.drawer
    },
    activateSnackbar (message: string, color: string) {
      this.snackbar.visible = true
      this.snackbar.message = message
      if (color === 'error') {
        this.snackbar.color = theme.value === 'dark' ? 'orange-accent-4' : 'deep-orange'
        this.snackbar.icon = 'mdi-close-circle'
      } else if (color === 'success') {
        this.snackbar.color = theme.value === 'dark' ? 'lime' : 'green'
        this.snackbar.icon = 'mdi-check-circle'
      }
    },
  },
})
