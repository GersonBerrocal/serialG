import { User } from './clases/User.js'

function setInfoUser(user: User) {
  menuAgregarUsuario(user.user_name)
  document.querySelector('.menu-user-cerrar').addEventListener('click', () => {
    user.cerrarSesion()
    menuCerrarUsuario()
  })
}
function menuAgregarUsuario(user_name: string) {
  document.querySelector('.menu-user').classList.add('menu-user-isActive')
  document.querySelector('.menu-user-name').innerHTML = user_name
}
function menuCerrarUsuario() {
  document.querySelector('.menu-user').classList.remove('menu-user-isActive')
  document.querySelector('.menu-user-name').innerHTML = 'userName'
}

export default { setInfoUser }
