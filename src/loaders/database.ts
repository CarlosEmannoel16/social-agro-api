import { entities } from "../infra/ORM/index";
import { DataSource } from "typeorm";

export class DatabaseInitializer {
  private static _instance: DatabaseInitializer;
  private dataSource!: DataSource;

  constructor() {
    this.init();
  }

  private initPostgres() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "test",
      password: "test",
      database: "test",
      synchronize: true,
      logging: true,
      entities,
    });
    console.log("Postgres initialized");
  }

  init() {
    this.initPostgres();
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
}

