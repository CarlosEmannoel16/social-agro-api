import { Note } from "@/domain/expenses/valueObjects/Note";
import { Animal } from "../../../domain/animal/entity/Animal";
import { AnimalFactory } from "../../../domain/animal/factory/AnimalFactory";
import {
  AnimalRepositoryInterface,
  InputFindWithParamsRepository,
  addWeightParams,
} from "../../../domain/animal/repository/AnimaProtocolRepository";
import { DatabaseInitializer } from "@database";
import { AnimalEntity, GenderAnimal } from "@/infra/ORM/AnimalEntity";
import { ILike, In } from "typeorm";
import { ImagesAnimalEntity } from "@/infra/ORM/ImagesAnimalEntity";
import { WeightHistoryEntity } from "@/infra/ORM/WeightHistoryEntity";
import { VaccinationEntity } from "@/infra/ORM/VaccinationEntity";
import { AnimalNotesEntity } from "@entities/AnimalNotesEntity";
import { weightAnimal } from "@/domain/animal/entity/WeightAnimal";
import { v4 } from "uuid";
export class AnimalRepository implements AnimalRepositoryInterface {
  async findByIds(ids: string[], userId: string): Promise<Animal[]> {
    const animals = await DatabaseInitializer.db()
      .getRepository(AnimalEntity)
      .find({
        where: {
          userId: userId,
          id: In(ids),
        },
      });

    if (!animals) return [];

    return animals.map((animal) => {
      return AnimalFactory.createNewAnimal({
        dateOfBirth: animal.dateOfBirth,
        gender: animal.gender,
        breed: animal.breed ? animal.breed.name : undefined,
        fatherId: animal.fatherId || undefined,
        id: animal.id,
        images: animal.images.map((img) => img.url),
        motherId: animal.motherId || undefined,
        surname: animal.surname,
        ownerId: animal.userId,
        weightHistory: animal.weightHistory.map((weight) => {
          return new weightAnimal(weight.weight, weight.createdAt);
        }),
      });
    });
  }
  async createSon(data: Animal, userId: string): Promise<Animal> {
    const result = await DatabaseInitializer.db()
      .getRepository(AnimalEntity)
      .save({
        dateOfBirth: data.dateOfBirth,
        fatherId: data.fatherId,
        motherId: data.motherId,
        surname: data.surname,
        gender: data.gender,
        userId: userId,
      });

    return data;
  }
  async editNote(data: Note): Promise<Note | undefined> {
    const note = new AnimalNotesEntity();
    note.color = data.color;
    note.description = data.text;
    note.title = data.title;
    note.animalId = data.animalId;
    note.id = data.id;

    await DatabaseInitializer.db().getRepository(AnimalNotesEntity).save(note);

    return data;
  }
  async deleteNote(animalId: string, noteId: string): Promise<any> {
    const repository =
      DatabaseInitializer.db().getRepository(AnimalNotesEntity);
    await repository.delete({ id: noteId, animalId: animalId });
  }
  async addNote(data: Note): Promise<Note> {
    const repository =
      DatabaseInitializer.db().getRepository(AnimalNotesEntity);

    await repository.save({
      animalId: data.animalId,
      color: data.color,
      description: data.text,
      title: data.title,
    });

    return data;
  }
  async findWithParams(
    params: InputFindWithParamsRepository,
    userId: string
  ): Promise<Animal[] | undefined> {
    const repository = DatabaseInitializer.db().getRepository(AnimalEntity);

    const result = await repository.find({
      where: {
        id: userId,
        surname: ILike(`%${params}%`),
      },
      relations: ["images", "breed"],
    });

    if (!result) return;

    return result.map((animal) => {
      return AnimalFactory.createNewAnimal({
        dateOfBirth: animal.dateOfBirth,
        gender: animal.gender as GenderAnimal,
        breed: animal.breed ? animal.breed.name : undefined,
        images: animal.images.map((img) => img.url),
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
    const repository =
      DatabaseInitializer.db().getRepository(ImagesAnimalEntity);

    await repository.save({
      url: imageUrl,
      animalId: animalId,
    });
  }
  async create(item: Animal): Promise<Animal> {
    const repository = DatabaseInitializer.db().getRepository(AnimalEntity);

    const result = await repository.save({
      id: v4(),
      dateOfBirth: item.dateOfBirth,
      surname: item.surname,
      gender: item.gender,
      userId: item.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!result) throw new Error("Error to create animal");
    return item;
  }
  async update(item: Animal): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async find(animalId: string): Promise<Animal | undefined> {
    const repository = DatabaseInitializer.db().getRepository(AnimalEntity);

    const animal = await repository.findOne({
      where: {
        id: animalId,
      },
    });

    if (!animal) return;

    return AnimalFactory.createNewAnimal({
      dateOfBirth: animal.dateOfBirth,
      gender: animal.gender as GenderAnimal,
      breed: animal.breed.name || undefined,
      images: animal.images.map((img) => img.url),
      fatherId: animal.fatherId || undefined,
      motherId: animal.motherId || undefined,
      surname: animal.surname,
    });
  }
  async findAll(userId: string): Promise<Animal[]> {
    const repository = DatabaseInitializer.db().getRepository(AnimalEntity);

    const animal = await repository.find({
      where: {
        userId: userId,
      },
    });

    console.log(animal);

    if (!animal) throw new Error("Error to find animals");

    return AnimalFactory.createMap(
      animal.map((animal) => ({
        dateOfBirth: animal.dateOfBirth,
        gender: animal.gender,
        breed: animal?.breed?.name || undefined,
        images: animal?.images?.map((img) => img.url) || [],
        fatherId: animal.fatherId || undefined,
        motherId: animal.motherId || undefined,
        surname: animal.surname,
        id: animal.id,
        weightHistory: animal?.weightHistory?.map((weight) => ({
          dateOfRegister: weight.createdAt,
          weight: weight.weight,
        })) || [],
      }))
    );
  }
  async addWeight(data: addWeightParams): Promise<any> {
    const repository =
      DatabaseInitializer.db().getRepository(WeightHistoryEntity);

    await repository.save({
      animalId: data.idAnimal,
      date: data.date,
      weight: data.weight,
    });
  }
  async findHistoryVaccines(idAnimal: string) {
    const repository =
      DatabaseInitializer.db().getRepository(VaccinationEntity);

    const result = await repository.find({
      where: {
        animalId: idAnimal,
      },
    });

    return result;
  }
  async findWeightHistory(idAnimal: string) {
    const repository =
      DatabaseInitializer.db().getRepository(WeightHistoryEntity);

    const result = await repository.find({
      where: {
        animalId: idAnimal,
      },
    });

    return result;
  }
}
