import request from "supertest";
import { initDataBaseContainers } from "../../../config/tests/database";
import { app } from "../../../api/express";
import { PrismaClient } from "@prisma/client";

describe("POST /animal", () => {
  let dataBasePostgres: PrismaClient;
  beforeAll(async () => {
    let { dataBasePostgres } = await initDataBaseContainers();

    await dataBasePostgres.user.create({
      data: {
        id: "123",
        email: "any_email@email.com",
        name: "Any User",
        password: "12345",
      },
    });
  });

  afterAll(async () => {
    await dataBasePostgres.user.deleteMany({ where: { id: "123" } });
  });

  it("should return 200", async () => {
    const response = await request(app).post("animal").send({
      name: "dog",
      breed: "labrador",
      weight: 10,
      ownerId: "123",
    });

    expect(response.status).toBe(200);
  });
});
