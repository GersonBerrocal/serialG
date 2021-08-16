class Reproductor {
  constructor() {}
  reproducir(url, videoElement) {
    videoElement.src = url
  }
  cerrar(videoElement) {
    const parent = videoElement.parentNode
    parent.removeChild(videoElement)
    videoElement.src = '#'
    parent.appendChild(videoElement)
  }
}

export { Reproductor }
