import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
const runContainers = async () => {
  const postgresContainers = new PostgreSqlContainer()
    .withReuse()
    .withExposedPorts(5432)
    .withDatabase("test")
    .withUsername("test")
    .withPassword("test");

  const containerPostgresInRun = await postgresContainers.start();

  return { containerPostgresInRun };
};

export const initDataBaseContainers = async () => {
  const { containerPostgresInRun } = await runContainers();

  const dataBase = new PrismaClient({
    datasourceUrl: containerPostgresInRun.getConnectionUri(),
  });

  execSync("npx prisma migrate dev --preview-feature", { stdio: "inherit",
    env:{
      ...process.env,
      DATABASE_URL: containerPostgresInRun.getConnectionUri(),
    }
   });

  await dataBase.$connect();

  return { dataBasePostgres: dataBase };
};


