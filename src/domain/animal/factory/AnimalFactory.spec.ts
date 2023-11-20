import { TypeAnimal } from "../entity/Animal";
import { AnimalFactory } from "./AnimalFactory";

describe("User Factory  Test Unit", () => {
  it("Should return a new Animal", () => {
    expect(() =>
      AnimalFactory.createNewAnimal({
        dateOfBirth: new Date(),
        fatherId: "123",
        surname: "surname",
        type: TypeAnimal.COW,
        ownerId: "123",
      })
    ).toBeDefined();
  });

  it("Should return a new Animal without surname", () => {
    const animal = AnimalFactory.createNewAnimal({
      dateOfBirth: new Date(),
      fatherId: "123",
      type: TypeAnimal.COW,
      ownerId: "123",
    });
    expect(animal.surname).toBeUndefined();
  });

  it("should return a new animal with surname", () => {
    const animal = AnimalFactory.createNewAnimal({
      dateOfBirth: new Date(),
      fatherId: "123",
      surname: "surname",
      type: TypeAnimal.COW,
      ownerId: "123",
    });
    expect(animal.surname).toBe("surname");
  });
});
