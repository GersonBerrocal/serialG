const joi = require('joi')

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const userUserNameSchema = joi.string().max(25)
const userPasswordSchema = joi.string().max(25)
const userNameSchema = joi.string().max(30)
const userLastNameSchema = joi.string().max(50)
const userEmailSchema = joi.string().email()
const userGenderSchema = joi.string().valid('F', 'M')
const userFavoritesSchema = joi
  .array()
  .items(joi.object({ idMovie: userIdSchema }))

const createUserSchema = joi.object({
  user_name: userUserNameSchema.required(),
  password: userPasswordSchema.required(),
  name: userNameSchema.required(),
  last_name: userLastNameSchema.required(),
  email: userEmailSchema.required(),
  gender: userGenderSchema.required(),
  favorites: userFavoritesSchema,
})
const updateUserSchema = joi.object({
  user_name: userUserNameSchema,
  password: userPasswordSchema,
  name: userNameSchema,
  last_name: userLastNameSchema,
  email: userEmailSchema,
  gender: userGenderSchema,
  favorites: userFavoritesSchema,
})

const idUserSchema = joi.object({ userId: userIdSchema })

module.exports = { createUserSchema, updateUserSchema, idUserSchema }
