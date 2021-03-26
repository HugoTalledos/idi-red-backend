const Joi = require("joi");

const LendValidator = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  cellphone: Joi.number(),
});

module.exports = {
  validateSchema: (req, res, next) => {
    let { id } = req.params;
    let { name, cellphone } = req.body;
    const { error, value } = LendValidator.validate({
      id,
      name,
      cellphone,
    });
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      next();
    }
  },
};
