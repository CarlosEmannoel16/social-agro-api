/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Animals` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Animals" ADD COLUMN     "key" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animalId" TEXT,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalExpenses" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "categoryId" TEXT,
    "animalId" TEXT,

    CONSTRAINT "AnimalExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryExpense" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseAndSaleHistory" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "animalId" TEXT,

    CONSTRAINT "PurchaseAndSaleHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Animals_key_key" ON "Animals"("key");

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalExpenses" ADD CONSTRAINT "AnimalExpenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryExpense"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalExpenses" ADD CONSTRAINT "AnimalExpenses_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseAndSaleHistory" ADD CONSTRAINT "PurchaseAndSaleHistory_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
