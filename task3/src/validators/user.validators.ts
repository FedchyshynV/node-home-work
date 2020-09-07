import * as Joi from '@hapi/joi'
 
export const userSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])')).required(),
  age: Joi.number().min(4).max(130).required(),
});
