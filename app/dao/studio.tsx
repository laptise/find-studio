import { getRepository } from "typeorm";
import { getDb } from "../db";
import { Studio } from "../entities/studio";

namespace StudioDao {
  export async function getStudioFromId(id: number) {
    await getDb();
    return await getRepository(Studio).findOne({ id });
  }
  export async function getNewestStudio() {
    await getDb();
    return await getRepository(Studio).createQueryBuilder().select().limit(10).orderBy("UPDATED_AT").getMany();
  }
}
export default StudioDao;
