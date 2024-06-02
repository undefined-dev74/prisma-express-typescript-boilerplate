/*
  Warnings:

  - Added the required column `dailyInterest` to the `InvestmentPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investmentplan` ADD COLUMN `dailyInterest` DOUBLE NOT NULL;
