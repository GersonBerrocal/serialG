class User {
  user_name: string
  name: string
  last_name: String
  email: string
  role: string
  constructor(
    user_name: string,
    name: string,
    last_name: string,
    email: string,
    role: string
  ) {
    this.user_name = user_name
    this.name = name
    this.last_name = last_name
    this.email = email
    this.role = role
  }
  static async verificarToken() {
    const token = localStorage.getItem('token')
    if (!token) return false
    const userRequest = await fetch('/user', {
      method: 'GET',
      headers: { authorization: `Bearer ${token}` }
    })
    if (userRequest.status == 400) return false
    const userData = await userRequest.json()
    return userData.data
  }
  cerrarSesion() {
    // eliminar token
    localStorage.removeItem('token')
    return true
  }
  static async iniciarSesion(userName, password) {
    const loginResponse = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    })
    if (loginResponse.status == 200) {
      const token = await loginResponse.json()
      localStorage.setItem('token', token.token)
      return true
    } else return false
  }
}

export { User }
