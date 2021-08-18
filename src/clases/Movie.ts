class Movie {
  title: string
  genres: string[]
  time: number
  cover: string
  description: string
  plan: string
  content: {}
  _id: string
  constructor(
    _id: string,
    title: string,
    genres: string[],
    time: number,
    cover: string,
    description: string,
    plan: string,
    content: {}
  ) {
    this.title = title
    this.genres = genres
    this.time = time
    this.cover = cover
    this.description = description
    this.plan = plan
    this.content = content
    this._id = _id
  }
  async obtenerVideo(index) {
    const token = localStorage.getItem('token')
    let req = {}
    if (token)
      req = { method: 'GET', headers: { authorization: 'Bearer ' + token } }
    else req = { method: 'GET' }
    return fetch(`/api/movies/video/${this._id}/${index}`, req)
  }
}

export { Movie }
