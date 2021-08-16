import { Reproductor } from './Reproductor.js';
var reproductor = new Reproductor();
var videoElement = document.getElementById('reproductor-video');
var btnCerrarReproductor = document.getElementById('reproductor-cerrar');
var movieItems = document.querySelectorAll('.movie-item');
console.log(movieItems);
btnCerrarReproductor.addEventListener('click', function () {
    reproductor.cerrar(videoElement);
});
//# sourceMappingURL=indexMovie.js.map