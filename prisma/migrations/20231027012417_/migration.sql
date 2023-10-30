-- CreateEnum
CREATE TYPE "TypeAnimal" AS ENUM ('OX', 'COW');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animals" (
    "id" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "type" "TypeAnimal" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "breedAnimalsId" TEXT,
    "father" TEXT,
    "mother" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightHistory" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "animalsId" TEXT,

    CONSTRAINT "WeightHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyAmountOfMilk" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "animalsId" TEXT,

    CONSTRAINT "DailyAmountOfMilk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaccination" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "animalsId" TEXT,

    CONSTRAINT "Vaccination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BreedAnimals" (
    "id" TEXT NOT NULL,
    "typeAnimal" "TypeAnimal" NOT NULL,
    "breed" TEXT NOT NULL,

    CONSTRAINT "BreedAnimals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT,
    "dateOfPost" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "animalsId" TEXT,

    CONSTRAINT "MarketItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentsMarketIten" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "dateOfPost" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "marketItemId" TEXT,
    "userId" TEXT,

    CONSTRAINT "commentsMarketIten_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Animals_father_key" ON "Animals"("father");

-- CreateIndex
CREATE UNIQUE INDEX "Animals_mother_key" ON "Animals"("mother");

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_breedAnimalsId_fkey" FOREIGN KEY ("breedAnimalsId") REFERENCES "BreedAnimals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_father_fkey" FOREIGN KEY ("father") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_mother_fkey" FOREIGN KEY ("mother") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightHistory" ADD CONSTRAINT "WeightHistory_animalsId_fkey" FOREIGN KEY ("animalsId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyAmountOfMilk" ADD CONSTRAINT "DailyAmountOfMilk_animalsId_fkey" FOREIGN KEY ("animalsId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaccination" ADD CONSTRAINT "Vaccination_animalsId_fkey" FOREIGN KEY ("animalsId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketItem" ADD CONSTRAINT "MarketItem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketItem" ADD CONSTRAINT "MarketItem_animalsId_fkey" FOREIGN KEY ("animalsId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentsMarketIten" ADD CONSTRAINT "commentsMarketIten_marketItemId_fkey" FOREIGN KEY ("marketItemId") REFERENCES "MarketItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentsMarketIten" ADD CONSTRAINT "commentsMarketIten_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
