import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: [],
  [Role.ADMIN]: [
    'getUsers',
    'manageUsers',
    'createInvestmentPlan',
    'getInvestmentPlans',
    'manageInvestmentPlan'
  ]
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
