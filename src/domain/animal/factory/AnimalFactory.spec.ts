import { GenderAnimal } from "@/infra/ORM/AnimalEntity";
import { AnimalFactory } from "./AnimalFactory";

describe("User Factory  Test Unit", () => {
  it("Should return a new Animal", () => {
    expect(() =>
      AnimalFactory.createNewAnimal({
        dateOfBirth: new Date(),
        fatherId: "123",
        surname: "surname",
        gender: GenderAnimal.COW,
      })
    ).toBeDefined();
  });

  it("Should return a new Animal without surname", () => {
    const animal = AnimalFactory.createNewAnimal({
      dateOfBirth: new Date(),
      fatherId: "123",
      gender: GenderAnimal.COW,
    });
    expect(animal.surname).toBeUndefined();
  });

  it("should return a new animal with surname", () => {
    const animal = AnimalFactory.createNewAnimal({
      dateOfBirth: new Date(),
      fatherId: "123",
      surname: "surname",
      gender: GenderAnimal.COW,
    });
    expect(animal.surname).toBe("surname");
  });
});
