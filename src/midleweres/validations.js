import Joi from "joi";

export async function validaPostUser(req, res, next) {
  const validation = schemaPostUser.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    console.log("mid");
    return res.status(422).send(validation.error.message);
  }

  next();
}

const schemaPostUser = Joi.object().keys({
  name: Joi.string().min(1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(1).required(),
  confirmPassword: Joi.string().min(1).required(),
});

export async function validatePostLogin(req, res, next) {
  const validation = schemaPostLogin.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    return res.send(validation.error);
  }

  next();
}

const schemaPostLogin = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(1).required(),
});

export async function validatePostClient(req, res, next) {
  const validation = schemaPostClient.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    return res.send(validation.error);
  }

  next();
}

const schemaPostClient = Joi.object().keys({
  name: Joi.string().min(1).required(),
  phone: Joi.string().min(10).max(11).required(),
  cpf: Joi.string().min(11).max(11).required(),
  birthday: Joi.date().required(),
});

export async function validatePostRental(req, res, next) {
  const validation = schemaPostRental.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    return res.send(validation.error);
  }

  next();
}

const schemaPostRental = Joi.object().keys({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.number().min(1).required(),
});
