import { MarketItem } from "./MarketItem";



describe("MarketItem unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const mkItem = new MarketItem("", "title", new Date(), 1, '01');
    }).toThrowError("Id is required");
  });

  it("should throw error when title is empty", () => {
    expect(() => {
      const mkItem = new MarketItem("id1", "", new Date(), 1, '01');
    }).toThrowError("Title is required");
  });

  it("should throw error when dateOfPost is empty", () => {
    expect(() => {
      const mkItem = new MarketItem("id1", "title", null as any, 1, '01');
    }).toThrowError("DateOfPost is required");
  });

  it("should change description", () => {
    const mkItem = new MarketItem("id1", "title", new Date(), 1, '01');
    mkItem.changeDescription("description teste 1");
    expect(mkItem.description).toBe("description teste 1");
  });

  it("should throw error when description muster have more than 100 characters ", () => {
    const mkItem = new MarketItem("id1", "title", new Date(), 1, '01');
    let description = "teste".padEnd(102, "a");
 
    expect(() => {
      mkItem.changeDescription(description);
    }).toThrowError("Description must be up to 100 characters");
  });

  it("should throw error when price is empty", () => {
    expect(() => {
      const mkItem = new MarketItem("id1", "title", new Date(), null as any, '01');
    }).toThrowError("Price is required");
  });
});
