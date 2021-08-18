import { Reproductor } from './clases/Reproductor.js'
import { User } from './clases/User.js'
import menu from './menu.js'
import { Movie } from './clases/Movie.js'

const contentLista = document.getElementById('movie-lista')
const elementReproductor = document.getElementById('reproductor')
const reproductorCerrar = document.getElementById('reproductor-cerrar')

User.verificarToken().then((result) => {
  if (result) {
    const r = result
    const user = new User(r.user_name, r.name, r.last_name, r.email, r.role)
    menu.setInfoUser(user)
  }
})

function crearTablaInfoContenido({
  cover,
  title,
  genres,
  time,
  views,
  description
}) {
  const movieDescripcion = document.querySelector('.movieP-descripcion')
  movieDescripcion.innerHTML = description
  return `<div class="movieP-img">
            <img src="${cover}" alt="" />
          </div>
          <div class="movieP-info">
            <div class="movieP-info-tabla">
              <p>Titulo</p>
              <p class="movieP-titulo">${title}</p>
              <p>Generos</p>
              <p class="movieP-generos">${genres}</p>
              <p>Tiempo</p>
              <p class="movieP-tiempo">${time} minutos</p>
              <p>vistas</p>
              <p class="movieP-vistas">${views}</p>
            </div>
          </div>`
}
let reproductor: Reproductor = new Reproductor(elementReproductor)
let movie: Movie

async function reproducir(index) {
  const urlResponse = await movie.obtenerVideo(index)
  if (urlResponse.status == 404) return alert('debes iniciar sesion')
  else if (urlResponse.status == 403)
    return alert('Debes contratar un plan estandar o superior')
  const content = await urlResponse.json()
  reproductor.reproducir(content.url)
}
reproductorCerrar.addEventListener('click', () => {
  reproductor.cerrar()
})
function crearListaContenido(title, index) {
  const elementLi = document.createElement('li')
  elementLi.className = 'movie-item'
  elementLi.setAttribute('data-contentIndex', `${index}`)
  elementLi.addEventListener('click', () => {
    reproducir(index)
  })
  elementLi.innerHTML = `<img src="/img/icon-play.svg" alt="" />
                          <span>${title}</span>`
  return elementLi
}
async function pedirContenido() {
  const params = new URLSearchParams(window.location.search)
  const movieId = params.get('movieId')
  const contenidoResponse = await fetch(`/api/movies/${movieId}`)
  const contenido = await contenidoResponse.json()
  const elementHTML = document.getElementById('movieP')
  const { cover, title, genres, time, views, description, plan, _id } =
    contenido
  movie = new Movie(
    _id,
    title,
    genres,
    time,
    cover,
    description,
    plan,
    contenido.content
  )
  elementHTML.innerHTML = crearTablaInfoContenido({
    cover,
    title,
    genres,
    time,
    views,
    description
  })
  let index = 0
  let template = document.createElement('div')
  contenido.content.forEach((element) => {
    template.appendChild(crearListaContenido(element.title, index))
    index++
  })
  contentLista.appendChild(template)
}
pedirContenido()
