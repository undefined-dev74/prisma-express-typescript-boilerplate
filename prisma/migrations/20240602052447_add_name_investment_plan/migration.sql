/*
  Warnings:

  - Added the required column `name` to the `InvestmentPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investmentplan` ADD COLUMN `name` VARCHAR(191) NOT NULL;
