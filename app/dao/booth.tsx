import { getRepository } from "typeorm";
import { getDb } from "../db";
import { Booth } from "../entities/booth";

namespace BoothDao {
  export async function getBoothFromStudioId(studioId: number) {
    await getDb();
    return await getRepository(Booth).find({ studioId });
  }
}
export default BoothDao;
