import { entities } from "../infra/ORM/index";
import { DataSource } from "typeorm";

export class DatabaseInitializer {
  private static _instance: DatabaseInitializer;
  private dataSource!: DataSource;

  private PORT_POSTGRES = 5432; 
  private DB_NAME_POSTGRES = "agro";
  private DB_USER_POSTGRES = "postgres";
  private DB_PASSWORD_POSTGRES = "12345";

  constructor() {
    this.init();
  }

  private async initPostgres() {
    try {
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
      await this.dataSource.connect();
      console.log("Database connected");
     
    } catch (error) {
      console.error("Error to connect to database", error);}
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
