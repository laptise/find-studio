import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
import Line from "../entities/line";
import Station from "../entities/station";
import StationByLines from "../entities/station-by-lines";

export async function connectToDb() {
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
      entities: [Line, Station, StationByLines],
      synchronize: true,
      logging: false,
    });
  }
}
