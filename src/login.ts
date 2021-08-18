import { User } from './clases/User.js'

const form = document.getElementById('formLogin')

form.addEventListener('submit', async function (e) {
  e.preventDefault()
  const userName = form['userName'].value
  const password = form['userPassword'].value
  if (userName != '' && password != '') {
    const token = await User.iniciarSesion(userName, password)
    if (token) location.href = '/directorio'
    else alert('Revisa tus nombre de usuario o contraseña')
  }
})
