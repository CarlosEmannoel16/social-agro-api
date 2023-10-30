import { Animal } from "./Animal";

describe("Animals unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let animal = new Animal("", new Date(), "1");
    }).toThrowError("Id is required");
  });

  it("should throw error when dateOfBirth is empty", () => {
    expect(() => {
      let animal = new Animal("Animal", null as any, "1");
    }).toThrowError("Date of birth is required");
  });

  it("should throw error when fatherId is empty", () => {
    expect(() => {
      let animal = new Animal("Animal", new Date(), "");
    }).toThrowError("MotherId id is required");
  });

  it("should throw error when name in changeName is empty", () => {
    let animal = new Animal("Animal", new Date(), "1");

    expect(() => {
      animal.surname = "";
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    let animal = new Animal("Animal", new Date(), "1");
    animal.surname = "New name";
    expect(animal.surname).toBe("New name");
  });

  it("should change to public", () => {
    let animal = new Animal("Animal", new Date(), "1");
    animal.makeItPublic();
    expect(animal.isPublic).toBe(true);
  });
});
