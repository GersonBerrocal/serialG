class Movie {
  title: string
  genres: string[]
  time: number
  cover: string
  description: string
  plan: string
  content: {}
  constructor(
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
  }
}
