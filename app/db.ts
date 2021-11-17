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
        entities: [LineMst, StationMst, PrefectureMst],
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
