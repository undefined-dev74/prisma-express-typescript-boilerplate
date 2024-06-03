import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: ['createInvestment', 'createTransaction', 'getTransactions', 'withdraw'],
  [Role.ADMIN]: [
    'getUsers',
    'getTransactions',
    'manageUsers',
    'createInvestmentPlan',
    'getInvestmentPlans',
    'manageInvestmentPlan'
  ]
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
