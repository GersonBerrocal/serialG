const joi = require('joi')

const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const movieTitleSchema = joi.string().max(80)
const movieGenresSchema = joi.array().items(joi.string().max(50))
const movieTimeSchema = joi.number().min(5).max(600)
const movieCoverSchema = joi.string()
const movieContentSchema = joi
  .array()
  .items(joi.object({ title: joi.string().max(50), url: joi.string().uri() }))
const movieDescriptionSchema = joi.string().max(500)
const moviePlanSchema = joi.string().valid('basico', 'estandar', 'premiun')

const createMovieSchema = joi.object({
  title: movieTitleSchema.required(),
  genres: movieGenresSchema.required(),
  time: movieTimeSchema.required(),
  cover: movieCoverSchema.required(),
  content: movieContentSchema.required(),
  description: movieDescriptionSchema.required(),
  plan: moviePlanSchema.required()
})

const updateMovieSchema = joi.object({
  title: movieTitleSchema,
  genres: movieGenresSchema,
  time: movieTimeSchema,
  cover: movieCoverSchema,
  content: movieContentSchema,
  description: movieDescriptionSchema,
  plan: moviePlanSchema,
  views: joi.number().min(0)
})

const idMovieSchema = joi.object({
  idMovie: movieIdSchema.required()
})

module.exports = { idMovieSchema, createMovieSchema, updateMovieSchema }
