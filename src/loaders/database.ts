import { entities } from "../infra/ORM/index";
import { DataSource } from "typeorm";

export class DatabaseInitializer {
  private static _instance: DatabaseInitializer;
  private dataSource!: DataSource;

  private PORT_POSTGRES = 5432;
  private DB_NAME_POSTGRES = "test";
  private DB_USER_POSTGRES = "test";
  private DB_PASSWORD_POSTGRES = "test";

  constructor() {
    this.init();
  }

  private initPostgres() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: this.PORT_POSTGRES,
      username: this.DB_USER_POSTGRES,
      password: this.DB_PASSWORD_POSTGRES,
      database: this.DB_NAME_POSTGRES,
      synchronize: true,
      logging: true,
      entities,
    });
    console.log("Postgres initialized");
  }

  init() {
    this.initPostgres();
    return this.dataSource;
  }

  static instance() {
    if (!DatabaseInitializer._instance) {
      DatabaseInitializer._instance = new DatabaseInitializer();
    }
    return DatabaseInitializer._instance;
  }

  static db(): DataSource {
    return DatabaseInitializer.instance().dataSource;
  }

  setPortPostgres(port: number) {
    this.PORT_POSTGRES = port;
    return this;
  }
}
