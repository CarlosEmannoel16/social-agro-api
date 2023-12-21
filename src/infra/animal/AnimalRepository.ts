import { Animal, TypeAnimal } from "../../domain/animal/entity/Animal";
import { AnimalFactory } from "../../domain/animal/factory/AnimalFactory";
import { AnimalRepositoryInterface } from "../../domain/animal/repository/AnimaProtocolRepository";
import PrismaClient from "../../infra/@shared/db/prisma/config/PrismaClient";
export class AnimalRepository implements AnimalRepositoryInterface {
  async findWithParams(
    params: string,
    userId: string
  ): Promise<Animal[] | undefined> {
    const result = await PrismaClient.animals.findMany({
      where: {
        userId: userId,
        OR: [
          {
            surname: {
              contains: params,
            },
          },
        ],
      },
      take: 10,
    });

    if (!result) return;

    return result.map((animal) => {
      return AnimalFactory.createNewAnimal({
        dateOfBirth: animal.dateOfBirth,
        ownerId: animal.userId as string,
        type: animal.type as TypeAnimal,
        breed: animal.breedAnimalsId || undefined,
        images: [""],
        fatherId: animal.fatherId || undefined,
        motherId: animal.motherId || undefined,
        surname: animal.surname,
      });
    });
  }

  async addImage(
    animalId: string,
    imageUrl: string,
    userId: string
  ): Promise<void> {
    await PrismaClient.animals.update({
      where: { id: animalId, userId: userId },
      data: {
        ImagesAnimal: {
          create: {
            url: imageUrl,
          },
        },
      },
    });
  }
  async create(item: Animal): Promise<Animal> {
    const result = await PrismaClient.animals.create({
      data: {
        dateOfBirth: item.dateOfBirth,
        fatherId: item.fatherId,
        surname: item.surname,
        type: item.type,
        isPublic: item.isPublic,
        ImagesAnimal: {
          createMany: {
            data:
              item.image?.map((image) => {
                return {
                  url: image,
                };
              }) || [],
          },
        },
        id: item.id,
        userId: item.ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (!result) throw new Error("Error to create animal");
    return item;
  }
  update(item: Animal): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(userId: string, animalId: string): Promise<Animal | undefined> {
    const animal = await PrismaClient.animals.findFirst({
      where: {
        userId: userId,
        id: animalId,
      },
      include: {
        ImagesAnimal: true,
      },
    });

    if (!animal) return;

    return AnimalFactory.createNewAnimal({
      dateOfBirth: animal.dateOfBirth,
      ownerId: animal.userId as string,
      type: animal.type as TypeAnimal,
      breed: animal.breedAnimalsId || undefined,
      images: animal.ImagesAnimal.map((img) => img.url),
      fatherId: animal.fatherId || undefined,
      motherId: animal.motherId || undefined,
      surname: animal.surname,
    });
  }
  async findAll(userId: string): Promise<Animal[]> {
    const result = await PrismaClient.animals.findMany({
      where: {
        userId,
      },
      include: {
        ImagesAnimal: true,
      },
    });

    if (!result) throw new Error("Error to find animals");
    return result.map((animal) => {
      return AnimalFactory.createNewAnimal({
        dateOfBirth: animal.dateOfBirth,
        fatherId: animal.fatherId || undefined,
        ownerId: animal.userId as string,
        type: animal.type as TypeAnimal,
        breed: animal.breedAnimalsId || undefined,
        images: animal.ImagesAnimal.map((img) => img.url),
        motherId: animal.motherId || undefined,
        surname: animal.surname,
      });
    });
  }
}
