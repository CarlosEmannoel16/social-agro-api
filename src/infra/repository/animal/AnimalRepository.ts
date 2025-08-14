import { Animal } from "@/domain/animal/entity/Animal";
import { AnimalFactory } from "@/domain/animal/factory/AnimalFactory";
import {
  addWeightParams,
  AnimalRepositoryInterface,
  CreateAnimalRepositoryDTO,
  InputFindParamsRepository,
  InputFindWithParamsRepository,
  UpdateAnimalRepositoryDTO,
} from "@/domain/animal/repository/AnimaProtocolRepository";
import { MilkProduction } from "@/domain/animal/valueObjects/MilkProduction";
import { Note } from "@/domain/expenses/entity/Note";
import { db } from "@/infra/kysely";
import { GenderAnimal } from "@/infra/types/Animal";
import { sql } from "kysely";
import { v4 } from "uuid";

const dayOfWeekMap: { [key: number]: string } = {
  1: "Segunda", // Monday
  2: "Terça", // Tuesday
  3: "Quarta", // Wednesday
  4: "Quinta", // Thursday
  5: "Sexta", // Friday
  6: "Sábado", // Saturday
  0: "Domingo", // Sunday
};

export class AnimalRepository implements AnimalRepositoryInterface {
  async getInitialDashboardValues(userId: string): Promise<any> {
    console.log("userId ----->", userId);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfNextMonth = new Date(year, month + 1, 1);

    try {
      const result = await db
        .selectFrom("milk_production as mph")
        .innerJoin("milk_price as mp", "mp.id", "mph.price_milk_id")
        .innerJoin("animal", "animal.id", "mph.animal_id")
        .where("mph.date", ">=", firstDayOfMonth)
        .where("mph.date", "<", firstDayOfNextMonth)
        .where("animal.user_id", "=", userId)
        .select((eb) => [
          eb.fn.sum<number>("mph.quantity").as("totalLiters"),
          eb.fn.sum<number>(sql`mph.quantity * mp.price`).as("totalValueReais"),
        ])
        .executeTakeFirst();

      const totalLiters = result?.totalLiters ?? 0;
      const totalValueReais = result?.totalValueReais ?? 0;

      return { totalLiters, totalValueReais: Number(totalValueReais) / 100 };
    } catch (error) {
      console.error(
        "Erro ao calcular a produção de leite do mês atual:",
        error
      );
      throw error;
    }
  }

  async getMilkProductionRanking(userId: string) {
    return db
      .selectFrom("animal")
      .leftJoin("milk_production", "animal.id", "milk_production.animal_id")
      .select((eb) => [
        "animal.surname",
        "animal.id",
        eb.fn.sum<number>("milk_production.quantity").as("totalProduction"),
      ])
      .where("user_id", "=", userId)
      .groupBy(["animal.surname", "animal.id"])
      .orderBy("totalProduction", "desc")
      .execute();
  }

  async getMilkProductionRankingByBreed(userId: string) {
    return db
      .selectFrom("animal")
      .leftJoin("milk_production", "animal.id", "milk_production.animal_id")
      .select((eb) => [
        "animal.breed",
        eb.fn.sum<number>("milk_production.quantity").as("totalProduction"),
      ])
      .where("user_id", "=", userId)
      .groupBy(["animal.breed"])
      .orderBy("totalProduction", "desc")
      .execute();
  }

  async getLastWeekMilkProductionByDay(userId: string): Promise<
    Array<{
      dayName: string;
      dayNumber: number;
      date: string;
      totalLiters: number;
      totalValueReais: number;
    }>
  > {
    const now = new Date();

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    try {
      const results = await db
        .selectFrom("milk_production as mph")
        .innerJoin("milk_price as mp", "mp.id", "mph.price_milk_id")
        .innerJoin("animal", "animal.id", "mph.animal_id")
        .where("mph.date", ">=", sevenDaysAgo)
        .where("mph.date", "<=", endOfToday)
        .where("animal.user_id", "=", userId)
        .select((eb) => [
          sql<number>`EXTRACT(DOW FROM mph.date)`.as("dayNumber"),
          sql<string>`TO_CHAR(mph.date, 'YYYY-MM-DD')`.as("date"),
          eb.fn.sum<number>("mph.quantity").as("totalLiters"),
          eb.fn.sum<number>(sql`mph.quantity * mp.price`).as("totalValueReais"),
        ])
        .groupBy(["dayNumber", "date"])
        .orderBy("date asc")
        .execute();

      const productionMap: {
        [date: string]: {
          dayName: string;
          dayNumber: number;
          totalLiters: number;
          totalValueReais: number;
        };
      } = {};

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(sevenDaysAgo);
        currentDate.setDate(sevenDaysAgo.getDate() + i);
        const dateString = currentDate.toISOString().split("T")[0];
        const pgDayOfWeek = currentDate.getDay();

        productionMap[dateString] = {
          dayName: dayOfWeekMap[pgDayOfWeek],
          dayNumber: pgDayOfWeek,
          totalLiters: 0,
          totalValueReais: 0,
        };
      }

      results.forEach((row) => {
        if (row.date) {
          productionMap[row.date] = {
            dayName: dayOfWeekMap[row.dayNumber!],
            dayNumber: row.dayNumber!,
            totalLiters: row.totalLiters ?? 0,
            totalValueReais: Number(row.totalValueReais) / 10,
          };
        }
      });

      const orderedResult = Object.keys(productionMap)
        .sort()
        .map((dateString) => ({
          dayName: productionMap[dateString].dayName,
          dayNumber: productionMap[dateString].dayNumber,
          date: dateString,
          totalLiters: Number(productionMap[dateString].totalLiters),
          totalValueReais: Number(productionMap[dateString].totalValueReais),
        }));

      return orderedResult;
    } catch (error) {
      console.error(
        "Error calculating last week milk production by day for PostgreSQL:",
        error
      );
      throw error;
    }
  }
  addWeight(data: addWeightParams): Promise<any> {
    throw new Error("Method not implemented.");
  }
  addNote(data: Note, userId: string): Promise<Note> {
    throw new Error("Method not implemented.");
  }
  deleteNote(
    animalId: string,
    noteId: string,
    userId: string
  ): Promise<any | undefined> {
    throw new Error("Method not implemented.");
  }
  editNote(data: Note, userId: string): Promise<Note | undefined> {
    throw new Error("Method not implemented.");
  }
  createSon(data: Animal, userId: string): Promise<Animal> {
    throw new Error("Method not implemented.");
  }
  async create(input: CreateAnimalRepositoryDTO): Promise<void> {
    const animalId = v4();
    await db
      .insertInto("animal")
      .values({
        surname: input.surname,
        gender: input.gender,
        user_id: input.userId,
        date_of_birth: input.dateOfBirth,
        breed: input.breed,
        id: animalId,
      })
      .execute();

    if (input.weightHistory && input.weightHistory.length > 0) {
      await db
        .insertInto("weight_history")
        .values({
          animal_id: animalId,
          date: input.weightHistory[0].date,
          weight: input.weightHistory[0].weight,
        })
        .execute();
    }

    if (input.images) {
      let qb = db.insertInto("animal_images");
      input.images.map((img) => {
        qb = qb.values({
          animal_id: animalId,
          url: img,
        });
      });
      await qb.execute();
    }
  }

  async findByID(id: string, userId: string): Promise<Animal | undefined> {
    const animal = await db
      .selectFrom("animal")
      .leftJoin("animal_images as imgs", "imgs.animal_id", "animal.id")
      .selectAll("animal")
      .select("imgs.url as images")
      .where("animal.id", "=", id)
      .where("animal.user_id", "=", userId)
      .executeTakeFirst();

    if (!animal) return;

    const weightHistory = await db
      .selectFrom("weight_history")
      .select(["weight", "date"])
      .where("animal_id", "=", animal.id)
      .orderBy("date", "asc")
      .execute();

    const milkHistory = await db
      .selectFrom("milk_production")
      .leftJoin("milk_price as mp", "mp.id", "milk_production.price_milk_id")
      .select(["animal_id", "date", "quantity", "mp.price"])
      .where("animal_id", "=", animal.id)
      .orderBy("date", "asc")
      .execute();

    return AnimalFactory.createNewAnimal({
      dateOfBirth: animal.date_of_birth,
      gender: animal.gender,
      breed: animal.breed ?? undefined,
      surname: animal.surname,
      id: animal.id,
      ownerId: animal.user_id,
      weightHistory: weightHistory.map((data) => ({
        weight: data.weight,
        dateOfRegister: data.date,
      })),
      milkProduction:
        milkHistory?.map(
          (mh) =>
            new MilkProduction(
              mh.date,
              mh.quantity,
              mh.animal_id,
              mh.price || 0
            )
        ) ?? [],
      fatherId: undefined,
      motherId: undefined,
      images: animal.images ? [animal.images] : [],
    });
  }

  async findByIds(ids: string[], userId: string): Promise<Animal[]> {
    const animals = await db
      .selectFrom("animal")
      .selectAll()
      .where("user_id", "=", userId)
      .where("id", "in", ids)
      .execute();

    if (!animals.length) return [];

    return animals.map((animal) => {
      return AnimalFactory.createNewAnimal({
        dateOfBirth: animal.date_of_birth,
        gender: animal.gender,
        breed: animal.breed ?? undefined,
        fatherId: animal.father_id ?? undefined,
        id: animal.id,
        images: [],
        motherId: animal.mother_id ?? undefined,
        surname: animal.surname,
        ownerId: animal.user_id,
        weightHistory: [],
      });
    });
  }

  // async createSon(data: Animal, userId: string): Promise<Animal> {
  //   const newAnimalId = v4();
  //   await db
  //     .insertInto("animal")
  //     .values({
  //       id: newAnimalId,
  //       dateOfBirth: data.dateOfBirth,
  //       fatherId: data.fatherId,
  //       motherId: data.motherId,
  //       surname: data.surname,
  //       gender: data.gender,
  //       userId: userId,
  //       breed: data.breed,
  //     })
  //     .execute();

  //   return { ...data, id: newAnimalId };
  // }

  // async editNote(data: Note): Promise<Note | undefined> {
  //   const result = await db
  //     .updateTable("animal_notes")
  //     .set({
  //       color: data.color,
  //       description: data.text,
  //       title: data.title,
  //     })
  //     .where("id", "=", data.id)
  //     .where("animalId", "=", data.animalId)
  //     .executeTakeFirst();

  //   if (result.numUpdatedRows > 0) {
  //     return data;
  //   }
  //   return undefined;
  // }

  // async deleteNote(animalId: string, noteId: string): Promise<void> {
  //   await db
  //     .deleteFrom("animal_notes")
  //     .where("id", "=", noteId)
  //     .where("animalId", "=", animalId)
  //     .execute();
  // }

  // async addNote(data: Note): Promise<Note> {
  //   const newNoteId = v4();
  //   await db
  //     .insertInto("animal_notes")
  //     .values({
  //       id: newNoteId,
  //       animalId: data.animalId,
  //       color: data.color,
  //       description: data.text,
  //       title: data.title,
  //     })
  //     .execute();

  //   return { ...data, id: newNoteId };
  // }

  async findWithParams(
    params: InputFindWithParamsRepository,
    userId: string
  ): Promise<Animal[] | undefined> {
    const animals = await db
      .selectFrom("animal")
      .selectAll()
      .where("user_id", "=", userId)
      .where("surname", "like", `%${params.surname}%`)
      .execute();

    if (!animals.length) return;

    return animals.map((animal) => {
      return AnimalFactory.createNewAnimal({
        dateOfBirth: animal.date_of_birth,
        gender: animal.gender as GenderAnimal,
        breed: animal.breed ?? undefined,
        images: [],
        fatherId: animal.father_id ?? undefined,
        motherId: animal.mother_id ?? undefined,
        surname: animal.surname,
        id: animal.id,
        ownerId: animal.user_id,
        weightHistory: [],
      });
    });
  }

  async addImage(
    animalId: string,
    imageUrl: string,
    userId: string
  ): Promise<void> {
    await db
      .insertInto("animal_images")
      .values({
        url: imageUrl,
        animal_id: animalId,
      })
      .execute();
  }

  async update(input: UpdateAnimalRepositoryDTO): Promise<void> {
    let qb = db.updateTable("animal");

    if (input.surname) qb = qb.set("surname", input.surname);
    if (input.breed) qb = qb.set("breed", input.breed);
    if (input.dateOfBirth) qb = qb.set("date_of_birth", input.dateOfBirth);
    if (input.gender) qb = qb.set("gender", input.gender);

    await qb.where("animal.id", "=", input.id).execute();

    if (input.image) {
      await db
        .updateTable("animal_images")
        .set("url", input.image)
        .where("animal_id", "=", input.id)
        .execute();
    }
  }

  async find(data: InputFindParamsRepository): Promise<Animal | undefined> {
    const animal = await db
      .selectFrom("animal")
      .selectAll()
      .where("id", "=", data.animalId)
      .where("user_id", "=", data.userId)
      .executeTakeFirst();

    if (!animal) return;

    const images = await db
      .selectFrom("animal_images")
      .select(["url"])
      .where("animal_id", "=", animal.id)
      .execute();

    let breedName: string | undefined;
    if (animal.breed) {
      breedName = animal.breed;
    }

    return AnimalFactory.createNewAnimal({
      dateOfBirth: animal.date_of_birth,
      gender: animal.gender as GenderAnimal,
      breed: breedName,
      images: images.map((img) => img.url),
      fatherId: animal.father_id ?? undefined,
      motherId: animal.mother_id ?? undefined,
      surname: animal.surname,
      ownerId: animal.user_id,
      id: animal.id,
      weightHistory: [],
    });
  }

  async findAll(userId: string): Promise<Animal[]> {
    const response = await db
      .selectFrom("animal")
      .leftJoin("animal_images", "animal.id", "animal_images.animal_id")
      .selectAll(["animal"])
      .select("animal_images.url as images")
      .where("user_id", "=", userId)
      .orderBy("animal.created_at", "desc")
      .execute();

    if (!response.length) return [];

    return AnimalFactory.createMap(
      response.map((animal) => ({
        dateOfBirth: animal.date_of_birth,
        gender: animal.gender,
        breed: animal.breed ?? undefined,
        images: animal?.images ? [animal.images] : [],
        fatherId: animal.father_id ?? undefined,
        motherId: animal.mother_id ?? undefined,
        surname: animal.surname,
        id: animal.id,
        ownerId: animal.user_id,
        weightHistory: [],
        lastProduction: animal.last_production_date,
      }))
    );
  }

  async findWeightHistory(idAnimal: string) {
    const result = await db
      .selectFrom("weight_history")
      .selectAll()
      .where("animal_id", "=", idAnimal)
      .orderBy("date", "asc")
      .execute();

    return result;
  }

  async delete(animalId: string) {
    await db
      .deleteFrom("milk_production")
      .where("animal_id", "=", animalId)
      .execute();
    await db
      .deleteFrom("weight_history")
      .where("animal_id", "=", animalId)
      .execute();
    await db
      .deleteFrom("animal_images")
      .where("animal_id", "=", animalId)
      .execute();

    await db.deleteFrom("animal").where("id", "=", animalId).execute();
  }
}
