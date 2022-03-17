import * as Joi from 'joi';

export interface User {
  id: number;

  email: string;
  firstName: string;
  lastName: string;

  birthDate?: Date;
}

export const userSchema = Joi.object().keys({
  id: Joi.number().integer(),
  email: Joi.string().email({ tlds: { allow: false } }),
  firstName: Joi.string(),
  lastName: Joi.string(),
  birthDate: Joi.date().optional().allow(null),
});

export interface JwtToken {
  token: string;
  expiresIn: number;
}

export const jwtSchema = Joi.object().keys({
  token: Joi.string(),
  expiresIn: Joi.date().greater('now'),
});
