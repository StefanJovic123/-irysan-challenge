const Joi = require('joi');

const getFeedQueryParamsSchema = Joi.object({
  start_date: Joi.string().isoDate().optional(),
  end_date: Joi.string().isoDate().optional(),
  sort_by: Joi.string().default('name'),
  sort_order: Joi.string().valid('asc', 'desc').default('asc')
}).strict();

const getFeedItemParamsSchema = Joi.object({
  id: Joi.string().alphanum().required()
}).strict();

module.exports = {
  getFeedItemParamsSchema,
  getFeedQueryParamsSchema,
};

