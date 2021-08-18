import { User } from './clases/User.js'
import menu from './menu.js'

const btnFree = document.getElementById('btn-free')
const btnEstandar = document.getElementById('btn-estandar')
const btnPremiun = document.getElementById('btn-premiun')

User.verificarToken().then((result) => {
  if (result) {
    const r = result
    const user = new User(r.user_name, r.name, r.last_name, r.email, r.role)
    menu.setInfoUser(user)
  }
})

let token = localStorage.getItem('token')
if (token) {
  btnFree.classList.add('btn-disabled')
}
btnFree.addEventListener('click', () => {
  if (token) return alert('Ya tienes una cuenta')
  location.href = '/pages/singUp.html'
})
async function actualizarPlan(plan) {
  const bod = { plan }
  const resp = await fetch('/user/', {
    method: 'PUT',
    body: JSON.stringify(bod),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
  return resp
}
btnEstandar.addEventListener('click', async () => {
  if (!token) return alert('Debes iniciar sesion')
  const resp = await actualizarPlan('estandar')
  const res = await resp.json()
  localStorage.setItem('token', res.token)
  if (resp.status == 200) return alert('Bienvenido al plan estandar')
  else return alert('Lo siento, ocurrio un error, recarge la pagina')
})
btnPremiun.addEventListener('click', async () => {
  if (!token) return alert('Debes iniciar sesion')
  const resp = await actualizarPlan('premiun')
  const res = await resp.json()
  localStorage.setItem('token', res.token)
  if (resp.status == 200) return alert('Bienvenido al plan premiun')
  else return alert('Lo siento, ocurrio un error, recarge la pagina')
})
