import { BaseEntity, createConnection, EntityTarget, getConnection, getRepository, Repository } from "typeorm";
import { Line } from "./entities/line";
import { Station } from "./entities/station";
// import { Line, Station } from "./entities";

let connectionReadyPromise: Promise<void> | null = null;

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
        entities: [Line, Station],
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
