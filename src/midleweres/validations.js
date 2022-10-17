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

export async function validatePostShorten(req, res, next) {
  const validation = schemaPostShorten.validate(req.body, {
    abortEarly: true,
  });

  if (validation.error) {
    return res.send(validation.error);
  }

  next();
}

const schemaPostShorten = Joi.object().keys({
  url: Joi.string().uri().required(),
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
