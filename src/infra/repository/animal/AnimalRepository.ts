import { Note } from "@/domain/expenses/valueObjects/Note";
import { Animal, TypeAnimal } from "../../../domain/animal/entity/Animal";
import { AnimalFactory } from "../../../domain/animal/factory/AnimalFactory";
import {
  AnimalRepositoryInterface,
  addWeightParams,
} from "../../../domain/animal/repository/AnimaProtocolRepository";
import { DatabaseInitializer } from "@database";
import { AnimalEntity } from "@/infra/ORM/AnimalEntity";
import { ILike } from "typeorm";
import { ImagesAnimalEntity } from "@/infra/ORM/ImagesAnimalEntity";
import { WeightHistoryEntity } from "@/infra/ORM/WeightHistoryEntity";
import { VaccinationEntity } from "@/infra/ORM/VaccinationEntity";
import { AnimalNotesEntity } from "@entities/AnimalNotesEntity";
export class AnimalRepository implements AnimalRepositoryInterface {
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
    params: string,
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
        type: animal.type as TypeAnimal,
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
      fatherId: item.fatherId,
      dateOfBirth: item.dateOfBirth,
      surname: item.surname,
      type: item.type,
      motherId: item.motherId,
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
      type: animal.type as TypeAnimal,
      breed: animal.breed.name || undefined,
      images: animal.images.map((img) => img.url),
      fatherId: animal.fatherId || undefined,
      motherId: animal.motherId || undefined,
      surname: animal.surname,
    });
  }
  async findAll(): Promise<Animal[]> {
    const repository = DatabaseInitializer.db().getRepository(AnimalEntity);

    const animal = await repository.find();

    if (!animal) throw new Error("Error to find animals");

    return AnimalFactory.createMap(
      animal.map((animal) => ({
        dateOfBirth: animal.dateOfBirth,
        type: animal.type as TypeAnimal,
        breed: animal.breed.name || undefined,
        images: animal.images.map((img) => img.url),
        fatherId: animal.fatherId || undefined,
        motherId: animal.motherId || undefined,
        surname: animal.surname,
        id: animal.id,
        weightHistory: animal.weightHistory.map((weight) => ({
          dateOfRegister: weight.createdAt,
          weight: weight.weight,
        })),
      }))
    );
  }
  async addWeight(data: addWeightParams) {
    const repository =
      DatabaseInitializer.db().getRepository(WeightHistoryEntity);

    await repository.save({
      animalId: data.idAnimal,
      date: data.date,
      weight: data.weight,
    });
  }
  async findHistoryVaccines(idAnimal: string) {
    const repository = DatabaseInitializer.db().getRepository(
      VaccinationEntity
    );

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
