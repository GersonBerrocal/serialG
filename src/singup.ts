const formSing = document.getElementById('formSing')
async function obetenerDatos(e) {
  e.preventDefault()
  const fs = formSing
  const user_name = fs['nombre_user'].value
  const password = fs['contrasena'].value
  if (user_name == '' && password == '') return alert('Rellena los campos')
  const user = {
    user_name,
    name: fs['nombre'].value,
    last_name: fs['apellidos'].value,
    email: fs['correo'].value,
    gender: fs['genero'].value,
    password
  }
  const userResponse = await fetch('/user/singUp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  if (userResponse.status == 400) return alert('El nombre de usuario ya existe')
  const userToken = await userResponse.json()
  localStorage.setItem('token', userToken.token)
  location.href = '/directorio'
}
formSing.addEventListener('submit', obetenerDatos)
