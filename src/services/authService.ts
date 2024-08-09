import axios from '../utils/axios'

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post('/auth/login', { email, password })
    return response.data
  } catch (error) {
    throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const logout = async () => {
  try {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refrestToken')
  } catch (error) {
    throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
