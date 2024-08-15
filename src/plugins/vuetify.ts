/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const theme = ref('light')

// Función para determinar el tema actual
const detectCurrentTheme = () => {
  const isDarkMode = darkModeMediaQuery.matches
  const themeSession = sessionStorage.getItem('isDarkMode')
  if (themeSession) {
    return themeSession
  }
  return isDarkMode ? 'dark' : 'light'
}

theme.value = detectCurrentTheme()

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export const vuetify = createVuetify({
  theme: {
    defaultTheme: theme.value, // dark light
  },
})

export const setTheme = (t: string) => {
  theme.value = t
  vuetify.theme.global.name.value = t
}
