// Usuario autenticado
export interface User {
  id: number
  usuario: string
  rol: 'Administrador' | 'Invitado'
}

export interface LoginResponse {
  message: string
  success: boolean
  token: string
  user: User
}
