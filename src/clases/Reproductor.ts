class Reproductor {
  reproductor: HTMLElement
  constructor(element: HTMLElement) {
    this.reproductor = element
  }
  reproducir(url) {
    document.body.className = 'reproductor-isActive'
    this.reproductor.src = url
  }
  cerrar() {
    document.body.className = ''
    this.reproductor.src = '#'
  }
}

export { Reproductor }
