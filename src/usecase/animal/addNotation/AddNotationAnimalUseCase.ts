import { InputAddNotationAnimalDTO } from "./DTOs";
import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { Note } from "@/domain/expenses/entity/Note";
import { v4 } from "uuid";

export class AddNotationAnimalUseCase {
  constructor(private readonly animalRepository: AnimalRepositoryInterface) {}

  async execute(data: InputAddNotationAnimalDTO): Promise<any> {
    const animal = await this.animalRepository.find({
      animalId: data.animalId,
      userId: data.ownerId,
    });

    if (!animal) throw new Error("Animal not exists");

    const note = new Note(
      v4(),
      data.color,
      data.text,
      data.title,
      data.ownerId
    );

    await this.animalRepository.addNote(note, data.ownerId);
  }
}
