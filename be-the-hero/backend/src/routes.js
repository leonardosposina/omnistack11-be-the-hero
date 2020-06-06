const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); // Express validation.

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({  // Middleware validation.
  [Segments.BODY]: Joi.object().keys({  // Validate BODY
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(12).max(17),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), OngController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({  // Validate HEADERS
    authorization: Joi.string().required().length(8)
  }).unknown()
}), ProfileController.index);
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({  // Validate QUERY PARAMS
    page: Joi.number()
  })
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS] : Joi.object().keys({  // Validate PARAMS
    id: Joi.number().required()
  })
}), IncidentController.delete);

module.exports = routes;