import { UserFactory } from "./UserFactory";

describe("User Factory Unit Tests", () => {
  it("Should create a user with valid data", () => {
    const user = UserFactory.createNewUser({
      email: "emannoel@email.com",
      name: "emannoel",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("password");
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("updatedAt");

    expect(user.name).toBe("emannoel");
  });
});
