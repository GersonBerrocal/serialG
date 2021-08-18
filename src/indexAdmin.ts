const form = document.getElementById('formulario-pelicula')
const htmlLista = document.getElementById('peliculas-lista')
const linkAgregar = document.getElementById('agregar-content')
const contenedorFormulario = document.getElementById('contenedor-formulario')
const cerrarForm = document.getElementById('cerrarForm')

function listarContenido(_id, title) {
  return `<div class="pelicula" data-idMovie="${_id}">
          <span>${title}</span>
          <span><img class="pel-editar" src="/img/icon-editar.svg" alt="" />
          <img class="pel-eliminar" src="/img/icon-eliminar.svg"
              alt=""
          /></span>
        </div>`
}

function mostrarFormulario() {
  contenedorFormulario.classList.add('contenedor-formulario-isActive')
}
function cerrarFormulario() {
  contenedorFormulario.classList.remove('contenedor-formulario-isActive')
  limpiarDatos()
}
async function obtenerLista() {
  const contenidoResponse = await fetch('/api/movies/list', { method: 'GET' })
  const contenido = await contenidoResponse.json()
  let cnt: string = ''
  contenido.forEach((element) => {
    cnt += listarContenido(element._id, element.title)
  })
  htmlLista.innerHTML = cnt
}
obtenerLista()

function obtenerDatos() {
  if (formTipo.method == 'POST') {
    const jsonContent = form['contenido'].value
    const fd = new FormData()
    fd.append('title', form['titulo'].value)
    fd.append('genres', form['generos'].value.split(','))
    fd.append('description', form['descripcion'].value)
    fd.append('time', form['tiempo'].value)
    fd.append('plan', form['plan'].value)
    fd.append('cover', form['cover'].files[0])
    fd.append('content', jsonContent)
    return fd
  } else if (formTipo.method == 'PUT') {
    const jsonContent = form['contenido'].value
    const user = {
      title: form['titulo'].value,
      genres: form['generos'].value.split(','),
      time: Number(form['tiempo'].value),
      description: form['descripcion'].value,
      plan: form['plan'].value,
      content: JSON.parse(jsonContent)
    }
    return user
  }
}
function setearDatos({ title, genres, time, description, plan, content }) {
  form['titulo'].value = title
  form['generos'].value = genres
  form['tiempo'].value = time
  form['descripcion'].value = description
  form['plan'].value = plan
  form['contenido'].value = content
}
function limpiarDatos() {
  form['titulo'].value = ''
  form['generos'].value = ''
  form['tiempo'].value = ''
  form['descripcion'].value = ''
  form['plan'].value = ''
  form['contenido'].value = ''
  form['cover'].value = ''
}
let formTipo = { ruta: '/api/movies', method: 'POST' }

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const movie = obtenerDatos()
  let requestMovie = {}
  if (formTipo.method == 'PUT') {
    requestMovie = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    }
  } else if (formTipo.method == 'POST') {
    requestMovie = {
      method: 'POST',
      body: movie,
      redirect: 'follow'
    }
  } else requestMovie = {}
  const createMovie = await fetch(`${formTipo.ruta}`, requestMovie)
  if (createMovie.status != 200) return alert('Error verifique el esquema')
  const create = await createMovie.json()
  formTipo.method == 'POST'
    ? alert('Contenido creado')
    : alert('contenido actualizado')
  limpiarDatos()
})

htmlLista.addEventListener('click', async (e) => {
  const ele = e.target
  if (ele.className == 'pel-eliminar') {
    const idMovie = ele.parentNode.parentNode.getAttribute('data-idMovie')
    const deleteResponse = await fetch(`/api/movies/${idMovie}`, {
      method: 'DELETE'
    })
    if (deleteResponse.status == 200) location.href = '/admin'
    else alert('ocurrio un error')
  } else if (ele.className == 'pel-editar') {
    const idMovie = ele.parentNode.parentNode.getAttribute('data-idMovie')
    const getMovie = await fetch(`/api/movies/${idMovie}`, {
      method: 'GET'
    })
    if (getMovie.status != 200) return alert('ocurrio un error')
    const movie = await getMovie.json()
    const data = {
      title: movie.title,
      genres: movie.genres,
      time: movie.time,
      description: movie.description,
      plan: movie.plan,
      content: JSON.stringify(movie.content)
    }
    setearDatos(data)
    mostrarFormulario()
    formTipo = { method: 'PUT', ruta: `/api/movies/${movie._id}` }
  }
})

linkAgregar.addEventListener('click', () => {
  formTipo = { method: 'POST', ruta: '/api/movies' }
  mostrarFormulario()
})

cerrarForm.addEventListener('click', cerrarFormulario)
