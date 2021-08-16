import { Reproductor } from './Reproductor.js'

const reproductor = new Reproductor()

const videoElement = document.getElementById('reproductor-video')
const btnCerrarReproductor = document.getElementById('reproductor-cerrar')
const movieItems = document.querySelectorAll('.movie-item')

console.log(movieItems)
btnCerrarReproductor.addEventListener('click', () => {
  reproductor.cerrar(videoElement)
})
