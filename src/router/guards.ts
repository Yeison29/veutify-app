import { isAuthenticated } from './auth'

async function authGuard (to: any) {
  if (to.name !== 'Login' && !isAuthenticated()) {
    return { name: 'Login' }
  } else if (to.name === 'Login' && isAuthenticated()) {
    return { name: 'Dasboard' }
  } else if (to.name === 'App' && isAuthenticated()) {
    return { name: 'Dasboard' }
  }
}

export default authGuard
