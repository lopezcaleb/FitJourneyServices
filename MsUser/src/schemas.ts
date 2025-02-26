import Joi, { ObjectSchema } from "joi";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const userRegister = Joi.object().keys({
    username: Joi.string().min(6).max(60).required(),
    email: Joi.string().email().min(3).max(60).required(),
    password: Joi.string().pattern(new RegExp(PASSWORD_REGEX)).required(),
});

const userUpdate = Joi.object().keys({
    username: Joi.string().min(6).max(60).optional(),
    email: Joi.string().email().min(3).max(60).optional(),
});

const adminRegister = Joi.object().keys({
    username: Joi.string().min(6).max(60).required(),
    email: Joi.string().email().min(3).max(60).required(),
    password: Joi.string().pattern(new RegExp(PASSWORD_REGEX)).required(),
    rol: Joi.string().valid("admin", "user").required(),
});

const userGet = Joi.object().keys({
    id: Joi.string().min(24).max(24).required(),
});

const userGetAllFilter = Joi.object().keys({
  rol: Joi.string().min(4).max(5).optional().valid("admin", "user"),
  limit: Joi.number().min(0).max(50).optional(),
  offset: Joi.number().min(1)
});

export default {
  "/user/data": userRegister,
  "/admin/data": adminRegister,
  "/admin/update": userUpdate,
  "/admin/get": userGet,
  "/admin/filter": userGetAllFilter,
} as { [key: string]: ObjectSchema };
