import { AnimalRepositoryInterface } from "@/domain/animal/repository/AnimaProtocolRepository";
import { AddMilkProductionUseCase } from "./AddMilkProductionUseCase";
import { MilkRepositoryInterface } from "@/domain/animal/repository/MilkProductionRepository";

describe("Add Milk Production Unit Tes", () => {
  const makeAnimalRepository = (): AnimalRepositoryInterface => ({
    find: jest.fn().mockResolvedValue({}),
    ...({} as any),
  });

  const makeMilkRepository = (): MilkRepositoryInterface => ({
    addDailyMilkProduction: jest.fn(),
    ...({} as any),
  });

  const makeSut = () => {
    const animalRepositorySpy = makeAnimalRepository();
    const milkRepositorySpy = makeMilkRepository();
    const sut = new AddMilkProductionUseCase(
      animalRepositorySpy,
      milkRepositorySpy
    );

    return {
      sut,
      animalRepositorySpy,
      milkRepositorySpy,
    };
  };

  it("should be defined", () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it("should throw if animal not found", async () => {
    const { sut, animalRepositorySpy } = makeSut();
    animalRepositorySpy.find = jest.fn().mockResolvedValue(null);

    const promise = sut.handler({
      animalId: "1",
      ownerId: "1",
      dateOfProduction: new Date(),
      quantityOfMilk: 10,
    });

    await expect(promise).rejects.toThrow("Animal não encontrado");
  });

  it("should throw if date  of production is greater than current date", async () => {
    const { sut } = makeSut();

    const promise = sut.handler({
      animalId: "1",
      ownerId: "1",
      dateOfProduction: new Date("2080-01-01"),
      quantityOfMilk: 10,
    });

    await expect(promise).rejects.toThrow(
      "Data da produção deve ser igual ou anterior a data atual"
    );
  });
});
