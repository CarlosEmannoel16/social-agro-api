import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { DatabaseInitializer } from "@database";

const runContainers = async () => {
  const postgresContainers = new PostgreSqlContainer()
    .withReuse()
    .withExposedPorts(5432)
    .withDatabase("test")
    .withUsername("test")
    .withPassword("test");

  const runningPostgresContainer = await postgresContainers.start();
  return { runningPostgresContainer };
};

const initDatabaseConnection = async () => {
  const { runningPostgresContainer } = await runContainers();

  DatabaseInitializer.instance().setPortPostgres(
    runningPostgresContainer.getMappedPort(5432)
  );

  const postgresConnection = DatabaseInitializer.instance().init();

  await postgresConnection.synchronize();
};
