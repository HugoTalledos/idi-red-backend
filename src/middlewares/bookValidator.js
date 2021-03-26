const Joi = require("joi");

const BookValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  author: Joi.string().required(),
  gender: Joi.string(),
  editorial: Joi.string(),
  deleted: Joi.boolean(),
});

module.exports = {
  validateSchema: (req, res, next) => {
    let { title, description, author, gender, editorial, deleted } = req.body;
    const { error, value } = BookValidator.validate({
      title,
      description,
      author,
      gender,
      editorial,
      deleted,
    });
    if (error) {
      res.status(400).send({ error: error.details[0].message });
    } else {
      next();
    }
  },
};
