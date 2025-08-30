import { Animal } from "@/domain/animal/AnimalEntity";
import {
  AnimalRepositoryInterface,
  CreateAnimalRepositoryDTO,
  InputFindParamsRepository,
  InputFindWithParamsRepository,
  UpdateAnimalRepositoryDTO,
} from "@/domain/animal/interfaces/AnimaProtocolRepository";
import { MilkProduction } from "@/domain/animal/valueObjects/MilkProduction";
import { WeightAnimal } from "@/domain/animal/valueObjects/WeightAnimal";
import { db } from "@/infra/kysely";
import { GenderAnimal } from "@/infra/types/Animal";
import { GenerateFastId } from "@/usecase/utils/GeneratedFastId";
import { sql } from "kysely";
import { v4 } from "uuid";

const dayOfWeekMap: { [key: number]: string } = {
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
  0: "Domingo",
};

export class AnimalRepository implements AnimalRepositoryInterface {
  async getInitialDashboardValues(userId: string): Promise<any> {
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
        .where("animal.gender", "=", GenderAnimal.FEMALE)
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
      .where("animal.gender", "=", GenderAnimal.FEMALE)
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
      .where("animal.gender", "=", GenderAnimal.FEMALE)
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
        .where("animal.gender", "=", GenderAnimal.FEMALE)
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
        fast_id: GenerateFastId.create(new Date(), input.surname),
        acquisition_amount: input.acquisitionAmount,
        acquisition_date: input.dateOfAcquisition,
        financially_acquired: input.financiallyAcquired,
        mother_id: input.motherId,
        father_id: input.fatherId,
        created_at: new Date(),
        updated_at: new Date(),
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

    return Animal.createByDb({
      ...animal,
      weight:
        weightHistory.map((data) => new WeightAnimal(data.weight, data.date)) ??
        [],
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

    return animals.map((animal) => Animal.createByDb(animal));
  }

  async findWithParams(
    params: InputFindWithParamsRepository,
    userId: string
  ): Promise<Animal[] | undefined> {
    const animals = await db
      .selectFrom("animal")
      .selectAll()
      .where("animal.user_id", "=", userId)
      .where("animal.surname", "ilike", `%${params.surname}%`)
      .execute();

    if (!animals.length) return;

    const animalIds = animals.map((animal) => animal.id);

    const images = await db
      .selectFrom("animal_images")
      .select(["url", "animal_id"])
      .where("animal_id", "in", animalIds)
      .execute();

    return animals.map((animal) => {
      return Animal.createByDb({
        ...animal,
        images: images
          .filter((img) => img.animal_id === animal.id)
          .map((img) => img.url),
      });
    });
  }

  async addImage(animalId: string, imageUrl: string): Promise<void> {
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
    if (input.dateOfAcquisition)
      qb = qb.set("acquisition_date", input.dateOfAcquisition);
    if (input.acquisitionAmount)
      qb = qb.set("acquisition_amount", Number(input.acquisitionAmount));
    if (input.financiallyAcquired)
      qb = qb.set("financially_acquired", input.financiallyAcquired);
    if (input.fatherId) qb = qb.set("father_id", input.fatherId);
    if (input.motherId) qb = qb.set("mother_id", input.motherId);

    await qb.where("animal.id", "=", input.id).execute();

    if (input.image && input.image !== "undefined") {
      await db
        .updateTable("animal_images")
        .set("url", input.image)
        .where("animal_id", "=", input.id)
        .execute();
    }
  }

  async find(animalId: string): Promise<Animal | undefined> {
    const animal = await db
      .selectFrom("animal")
      .selectAll()
      .where("id", "=", animalId)
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

    return Animal.create({
      dateOfBirth: animal.date_of_birth,
      gender: animal.gender as GenderAnimal,
      breed: breedName || "Generic",
      images: images.map((img) => img.url),
      fatherId: animal.father_id ?? undefined,
      motherId: animal.mother_id ?? undefined,
      name: animal.surname,
      ownerId: animal.user_id,
      id: animal.id,
      weight: [],
      acquisitionAmount: animal.acquisition_amount,
      dateOfAcquisition: animal.acquisition_date ?? undefined,
      financiallyAcquired: animal.financially_acquired,
      dateOfCreation: animal.created_at ?? new Date(),
      dateOfUpdate: animal.updated_at ?? new Date(),
      fastId: animal.fast_id ?? "",
      lastProductionDate: animal.last_production_date ?? undefined,
      milkProduction: [],
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
    return response.map((animal) => {
      return Animal.createByDb({
        ...animal,
        images: animal.images ? [animal.images] : [],
      });
    });
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
