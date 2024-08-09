export function isAuthenticated () {
  // Implementa tu lógica de autenticación aquí
  return !!localStorage.getItem('authToken')
}
