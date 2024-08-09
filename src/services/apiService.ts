import axios from '../utils/axios'
import { logout } from '@/services/authService'

export const getDataUser = async () => {
  try {
    const response = await axios.get('/auth/profile') // Cambia esto por tu endpoint
    return response.data
  } catch (error) {
    await logout()
    throw new Error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
