import {
  BaseEntity,
  createConnection,
  DefaultNamingStrategy,
  EntityTarget,
  getConnection,
  getRepository,
  NamingStrategyInterface,
  Repository,
} from "typeorm";

import { LineMst } from "./entities/lineMst";
import { PrefectureMst } from "./entities/prefectureMst";
import { StationMst } from "./entities/stationsMst";
// import { Line, Station } from "./entities";
import { snakeCase } from "typeorm/util/StringUtils";
import { Studio } from "./entities/studio";
import { Booth } from "./entities/booth";

let connectionReadyPromise: Promise<void> | null = null;

const namingStrategy = new (class extends DefaultNamingStrategy {
  columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
    return customName ? customName : snakeCase(propertyName);
  }
  tableName(targetName: string, userSpecifiedName: string): string {
    return userSpecifiedName ? userSpecifiedName : snakeCase(targetName);
  }
})();
export function prepareConnection() {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection({
        type: "mysql",
        host: "db",
        port: 3306,
        username: "root",
        password: "Kk@k172988",
        database: "findStudio",
        entities: [LineMst, StationMst, PrefectureMst, Studio, Booth],
        namingStrategy,
        logging: false,
      });
    })();
  }

  return connectionReadyPromise;
}

export async function getDb() {
  await prepareConnection();
  return getConnection();
}

export async function getTable<Entity>(entityClass: EntityTarget<Entity>, connectionName?: string): Promise<Repository<Entity>> {
  await prepareConnection();
  return getRepository(entityClass);
}

const dev = process.env.NODE_ENV !== "production";

export const server = dev ? "http://localhost:4001" : "https://your_deployment.server.com";

export function toObject(res: BaseEntity[] | BaseEntity | undefined): object {
  return JSON.parse(JSON.stringify(res));
}

export function restoreObject<T>(src: T): T {
  for (const [key, value] of Object.entries(src)) {
    if (typeof value === "string" && value.length === 24 && value[10] === "T" && value[23] === "Z") {
      (src as any)[key] = new Date(value);
    }
  }
  return src;
}

export function restoreObjects<T>(srcList: T[]): T[] {
  return srcList.map((src) => {
    for (const [key, value] of Object.entries(src)) {
      if (typeof value === "string" && value.length === 24 && value[10] === "T" && value[23] === "Z") {
        (src as any)[key] = new Date(value);
      }
    }
    return src;
  });
}
