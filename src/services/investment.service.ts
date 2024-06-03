import { Investment, TransactionStatus, TransactionType } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a investment
 * @param {Object} payload
 * @returns {Promise<Investment>}
 */
const createInvestment = async (payload: Investment): Promise<Investment> => {
  const { userId, investmentPlanId, amount } = payload;

  // Fetch the InvestmentPlan to get its endDate
  const investmentPlan = await prisma.investmentPlan.findUnique({
    where: { id: investmentPlanId },
    select: { endDate: true, amount: true, dailyInterest: true, durationDays: true }
  });

  if (!investmentPlan) {
    throw new Error('InvestmentPlan not found');
  }

  // Check if the investment amount is within the allowed limit
  if (amount > investmentPlan.amount) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Investment amount exceeds the maximum limit for this plan'
    );
  }
  // Check if the user has already made an investment in the same investment plan
  const existingInvestment = await prisma.investment.findFirst({
    where: {
      userId,
      investmentPlanId
    }
  });

  if (existingInvestment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User has already made an investment in this plan');
  }

  const dailyInterestRate = investmentPlan.dailyInterest / 100;
  const totalInterest = amount * dailyInterestRate * investmentPlan.durationDays;
  const expectedReturn = amount + totalInterest;

  const newInvestment = await prisma.$transaction(async (prisma) => {
    const investment = await prisma.investment.create({
      data: {
        user: {
          connect: { id: userId }
        },
        investmentPlan: {
          connect: { id: investmentPlanId }
        },
        amount,
        endDate: investmentPlan.endDate,
        expectedReturn
      }
    });

    await prisma.transaction.create({
      data: {
        userId,
        investmentId: investment.id,
        transactionType: TransactionType.CREDIT,
        amount,
        status: TransactionStatus.SUCCESSFUL,
        date: new Date()
      }
    });

    return investment;
  });

  return newInvestment;
};

export const updateDailyEarnings = async () => {
  const investments = await prisma.investment.findMany({
    include: { investmentPlan: true }
  });

  for (const investment of investments) {
    const dailyEarning = investment.amount * (investment.investmentPlan.dailyInterest / 100);
    const newBalance = investment.balance + dailyEarning;

    // Update the investment balance
    await prisma.investment.update({
      where: { id: investment.id },
      data: { balance: newBalance }
    });

    // Create a transaction record for the daily earning
    await prisma.transaction.create({
      data: {
        userId: investment.userId,
        investmentId: investment.id,
        transactionType: TransactionType.CREDIT,
        amount: dailyEarning,
        status: TransactionStatus.SUCCESSFUL,
        date: new Date()
      }
    });
  }
  console.log('Daily earnings updated successfully');
};

export default {
  createInvestment,
  updateDailyEarnings
};
