import joi from "joi";

const createContactValidation = joi.object({
  first_name: joi.string().max(100).required(),
  last_name: joi.string().max(100).optional(),
  email: joi.string().max(200).optional(),
  phone: joi.string().max(20).required(),
});

export {
    createContactValidation,

}