import "reflect-metadata";
import { ConnectionOptions } from "tls";
import { createConnection, getConnection } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import Line from "../entities/line";
import { Station } from "../entities";
const config: MysqlConnectionOptions = {
  type: "mysql",
  host: "db",
  port: 3306,
  username: "root",
  password: "Kk@k172988",
  database: "findStudio",
  entities: [Line, Station],
  synchronize: true,
  logging: false,
};
export async function connectToDb() {
  console.log(Station);
  try {
    return getConnection();
  } catch {
    return createConnection(config);
  }
}
