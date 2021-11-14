import "reflect-metadata";
import { createConnection } from "typeorm";
import Station from "../entities/station";

export async function connection() {
  return createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: "Kk@k172988",
    database: "findStudio",
    entities: [Station],
    synchronize: true,
    logging: false,
  });
}
