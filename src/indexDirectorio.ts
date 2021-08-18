import { User } from './clases/User.js'
import menu from './menu.js'

const directorio = document.getElementById('directorio')

User.verificarToken().then((result) => {
  if (result) {
    const r = result
    const user = new User(r.user_name, r.name, r.last_name, r.email, r.role)
    menu.setInfoUser(user)
  }
})

// pedir lista de peliculas
function crearCardMovie({ cover, _id, title, genres, time, views }) {
  return `<div class="movie">
          <div class="movie-img">
            <a href="/movie/${_id}">
              <img src="${cover}" alt="portada" />
            </a>
          </div>
          <div class="movie-info">
            <div class="movie-info-tabla">
              <p>Titulo</p>
              <p class="movie-titulo">${title}</p>
              <p>Generos</p>
              <p class="movie-generos">${genres}</p>
              <p>Tiempo</p>
              <p class="movie-tiempo">${time} minutos(aprox.)</p>
              <p>vistas</p>
              <p class="movie-vistas">${views}</p>
            </div>
          </div>
        </div>`
}

async function pedirContenido() {
  const contenidoResponse = await fetch('/api/movies', { method: 'GET' })
  const contenido = await contenidoResponse.json()
  let contenidoHtml: string = ''
  contenido.forEach((element) => {
    console.log(element)

    contenidoHtml += crearCardMovie(element)
  })
  directorio.innerHTML = contenidoHtml
}

pedirContenido()
