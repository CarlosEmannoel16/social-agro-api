import { Phone } from "./Phone";
import { User } from "../entity/User";

describe("Phone unit tests", () => {
  it("should throw error when number is empty", () => {
    expect(() => {
      let user = new Phone("");
    }).toThrowError("Number is required");
  });
  it("should throw error when number size is greater than 11", () => {
    expect(() => {
      let user = new Phone("889970187112");
    }).toThrowError("Number is invalid");
  });

  it("should throw error when number size is less than 10", () => {
    expect(() => {
      let user = new Phone("889701871");
    }).toThrowError("Number is invalid");
  });

  it("should created phone", () => {
    let user = new Phone("8897018711");
    expect(user.number).toBe("8897018711");
  });

  it("should created phone with correct ddd", () => {
    let user1 = new Phone("8897018711");
    expect(user1.ddd).toBe("88");

    let user2 = new Phone("85997018711");
    expect(user2.ddd).toBe("85");
  });

  it("should created phone with tow digit", () => {
    let user1 = new Phone("8897018711");
    expect(user1.ddd).toHaveLength(2);

    let user2 = new Phone("85997018711");
    expect(user2.ddd).toHaveLength(2);
  });
});
