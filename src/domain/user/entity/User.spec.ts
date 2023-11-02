import { User } from "./User";

describe("User unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let user = new User("", "john", "1", "1", new Date(), new Date());
    }).toThrowError("id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let user = new User("1", "", "1", "1", new Date(), new Date());
    }).toThrowError("Name is required");
  });

  it("should throw error when email is empty", () => {
    expect(() => {
      let user = new User("1", "john", "", "1", new Date(), new Date());
    }).toThrowError("Email is required");
  });
  it("should throw error when password is empty", () => {
    expect(() => {
      let user = new User(
        "1",
        "john",
        "email@email.com",
        "",
        new Date(),
        new Date()
      );
    }).toThrowError("Password is required");
  });

  it("should throw error when name in change name is empty ", () => {
    const user = new User("1", "john", "1", "1", new Date(), new Date());
    expect(()=>user.changeName("")).toThrowError("Name is required");
  });

  it("should change name ", () => {
    const user = new User("1", "john", "1", "1", new Date(), new Date());
    user.changeName("john2");
    expect(user.name).toBe("john2");
  });

  it("should change email ", () => {
    const user = new User("1", "john", "1", "1", new Date(), new Date());
    user.changeEmail("teste@email.com");
    expect(user.email).toBe("teste@email.com");
  });
});
