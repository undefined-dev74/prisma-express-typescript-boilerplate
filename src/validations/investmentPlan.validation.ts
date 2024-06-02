import Joi from 'joi';

const createInvestmentPlan = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    amount: Joi.number().integer(),
    dailyInterest: Joi.number().required(),
    description: Joi.string(),
    returnPercentage: Joi.number().required(),
    durationDays: Joi.number().integer().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  })
};

const getInvestmentPlans = {
  query: Joi.object().keys({
    name: Joi.string(),
    amount: Joi.number(),
    dailyInterest: Joi.number(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getInvestmentPlan = {
  params: Joi.object().keys({
    investmentPlanId: Joi.number().integer()
  })
};

const updateInvestmentPlan = {
  params: Joi.object().keys({
    investmentPlanId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      dailyInterest: Joi.number(),
      returnPercentage: Joi.number()
    })
    .min(1)
};

const deleteInvestment = {
  params: Joi.object().keys({
    investmentPlanId: Joi.number().integer()
  })
};

export default {
  createInvestmentPlan,
  getInvestmentPlans,
  getInvestmentPlan,
  updateInvestmentPlan,
  deleteInvestment
};
