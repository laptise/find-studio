import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import Line from "../entities/line";
import Station from "../entities/station";

export async function connection() {
  try {
    return getConnection();
  } catch {
    return createConnection({
      type: "mysql",
      host: "db",
      port: 3306,
      username: "root",
      password: "Kk@k172988",
      database: "findStudio",
      entities: [Station, Line],
      synchronize: true,
      logging: false,
    });
  }
}
