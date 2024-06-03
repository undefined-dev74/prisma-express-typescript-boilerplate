import { Investment } from '@prisma/client';
import httpStatus from 'http-status';

import { investmentService } from '../services';
import catchAsync from '../utils/catchAsync';

const createInvestment = catchAsync(async (req: any, res) => {
  const userId = req?.user?.id;
  const { investmentPlanId, amount } = req.body;

  const investment = await investmentService.createInvestment({
    userId,
    investmentPlanId,
    amount
  } as Investment);
  res.status(httpStatus.CREATED).send(investment);
});

export default {
  createInvestment
};
