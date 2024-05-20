import PrismaClient from "@/infra/shared/db/prisma/config/prismaClient";

import { Note } from "@/domain/expenses/valueObjects/Note";
import { Animal, TypeAnimal } from "../../domain/animal/entity/Animal";
import { AnimalFactory } from "../../domain/animal/factory/AnimalFactory";
import {
  AnimalRepositoryInterface,
  addDailyMilkProductionParams,
  addWeightParams,
} from "../../domain/animal/repository/AnimaProtocolRepository";
export class AnimalRepository implements AnimalRepositoryInterface {
  async editNote(data: Note): Promise<Note | undefined> {
    await PrismaClient.notes.update({
      data: {
        color: data.color,
        text: data.text,
        title: data.title,
        animalId: data.animalId,
      },
      where: {
        id: data.id,
        animalId: data.animalId,
      },
    });

    return data;
  }
  async deleteNote(animalId: string, noteId: string): Promise<any> {
    await PrismaClient.notes.delete({
      where: {
        id: noteId,
        animalId: animalId,
      },
    });
  }
  async addNote(data: Note): Promise<Note> {
    await PrismaClient.notes.create({
      data: {
        color: data.color,
        text: data.text,
        title: data.title,
        animalId: data.animalId,
        createdAt: new Date(),
        id: data.id,
      },
    });

    return data;
  }
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
              startsWith: `%${params}%`,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        ImagesAnimal: true,
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
        images: animal.ImagesAnimal.map((img) => img.url),
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
    console.log(item.image);
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
  async update(item: Animal): Promise<void> {
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
        WeightHistory: true,
      },
    });

    if (!result) throw new Error("Error to find animals");

    return AnimalFactory.createMap(
      result.map((animal) => ({
        dateOfBirth: animal.dateOfBirth,
        ownerId: animal.userId as string,
        type: animal.type as TypeAnimal,
        breed: animal.breedAnimalsId || undefined,
        images: animal.ImagesAnimal.map((img) => img.url),
        fatherId: animal.fatherId || undefined,
        motherId: animal.motherId || undefined,
        surname: animal.surname,
        id: animal.id,
        weightHistory: animal.WeightHistory.map((weight) => ({
          dateOfRegister: weight.date,
          weight: weight.weight,
        })),
      }))
    );
  }

  async addWeight(data: addWeightParams) {
    const result = await PrismaClient.weightHistory.create({
      data: {
        date: data.date,
        weight: data.weight,
        animalsId: data.idAnimal,
      },
    });

    return result;
  }

  async addDailyMilkProduction(data: addDailyMilkProductionParams) {
    const result = await PrismaClient.dailyAmountOfMilk.create({
      data: {
        amount: data.dailyMilkProduction,
        date: data.date,
        animalsId: data.idAnimal,
      },
    });

    return result;
  }

  async findWeightHistory(idAnimal: string) {
    const result = await PrismaClient.weightHistory.findMany({
      where: {
        animalsId: idAnimal,
      },
    });

    return result;
  }

  async findDailyMilkProduction(idAnimal: string) {
    const result = await PrismaClient.dailyAmountOfMilk.findMany({
      where: {
        animalsId: idAnimal,
      },
    });

    return result;
  }

  async findHistoryVaccines(idAnimal: string) {
    const result = await PrismaClient.vaccination.findMany({
      where: {
        animalsId: idAnimal,
      },
    });

    return result;
  }
}
