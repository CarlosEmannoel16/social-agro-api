import { Animal, GenderAnimal } from "./Animal";

describe("Animals unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let animal = new Animal("", new Date(), GenderAnimal.COW, "1");
    }).toThrowError("Id is required");
  });

  it("should throw error when ownerId is empty", () => {
    expect(() => {
      let animal = new Animal("Animal", new Date(), GenderAnimal.COW, "1");
    }).toThrowError("Owner is required");
  });

  it("should throw error when dateOfBirth is empty", () => {
    expect(() => {
      let animal = new Animal("Animal", null as any, GenderAnimal.COW, "1");
    }).toThrowError("Date of birth is required");
  });

  it("should throw error when name in changeName is empty", () => {
    let animal = new Animal("Animal", new Date(), GenderAnimal.COW, "1");

    expect(() => {
      animal.surname = "";
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    let animal = new Animal("Animal", new Date(), GenderAnimal.COW, "1");
    animal.surname = "New name";
    expect(animal.surname).toBe("New name");
  });

 
});
