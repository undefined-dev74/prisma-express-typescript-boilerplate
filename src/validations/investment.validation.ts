import Joi from 'joi';

const createInvestment = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    investmentPlanId: Joi.number().integer()
  })
};

export default { createInvestment };
