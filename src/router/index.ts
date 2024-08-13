/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import Login from '@/components/Login.vue'
import Auth from '@/layouts/auth.vue'
import Default from '@/layouts/default.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Files from '@/components/Files.vue'
import Shared from '@/components/Shared.vue'
import Starred from '@/components/Starred.vue'
import authGuard from './guards'

const listRoutes:any = [
  {
    path: '/app',
    component: Default,
    name: 'App',
    children: [
      {
        path: '/',
        name: 'Dasboard',
        component: HelloWorld,
      },
      {
        path: '/files',
        name: 'Files',
        component: Files,
      },
      {
        path: '/shared',
        name: 'Shared',
        component: Shared,
      },
      {
        path: '/starred',
        name: 'Starred',
        component: Starred,
      },
    ],
  },
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
    ],
  },
]

const routesList:any = [...listRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesList,
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach(authGuard)

export default router
