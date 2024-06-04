import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: [
    'createInvestment',
    'createTransaction',
    'getTransactions',
    'withdraw',
    'getInvestment'
  ],
  [Role.ADMIN]: [
    'getUsers',
    'getTransactions',
    'manageUsers',
    'createInvestmentPlan',
    'getInvestmentPlans',
    'getInvestment',
    'manageInvestmentPlan'
  ]
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
