// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../db";
import Station from "../../entities/station";
import stations from "../../stations.json";
type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const entities = (stations as any[]).map((x) => {
    const entity = new Station(x["station_cd"]);
    entity.stationName = x["station_name"];
    entity.stationNameK = x["station_name_k"];
    entity.stationNameR = x["station_name_r"];
    entity.stationGCd = x["station_g_cd"];
    entity.lineCd = x["line_cd"];
    entity.prefCd = x["pref_cd"];
    entity.post = x["post"];
    entity.address = x["address"];
    entity.lng = x["lon"];
    entity.lat = x["lat"];
    entity.openYmd = x["open_ymd"];
    entity.closeYmd = x["close_ymd"];
    entity.eStatus = x["e_status"];
    entity.eSort = x["e_sort"];
    return entity;
  });
  await connectToDb().then(async (db) => {
    await db.getRepository(Station).save(entities);
    await db.close();
  });
  res.status(200).json({ name: "John Doe" });
}
