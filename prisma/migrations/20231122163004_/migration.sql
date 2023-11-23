-- CreateTable
CREATE TABLE "ImagesAnimal" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "animalId" TEXT,

    CONSTRAINT "ImagesAnimal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImagesAnimal" ADD CONSTRAINT "ImagesAnimal_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
