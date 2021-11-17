// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseEntity, createQueryBuilder, getConnection, getRepository, Like } from "typeorm";
import { prepareConnection } from "../../db";
import { StationMst } from "../../entities/stationsMst";
import stations from "../../lines.json";
type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<StationLines[]>) {
  const { query } = req;
  const { name } = query;
  if (typeof name === "string") await searchWithName(name, res);
}

async function searchWithName(name: string, res: NextApiResponse<StationLines[]>) {
  await prepareConnection();
  const key = `${name}%`;
  const stations = await createQueryBuilder(StationMst)
    .select(["MAX(station_Name) AS name", "station_G_Cd code"])
    .where("station_Name LIKE :key", { key })
    .groupBy("station_G_Cd")
    .getRawMany<{ name: string; code: number }>();
  const stationLines = await Promise.all(
    stations.map(async (station) => {
      const { code } = station;
      const lines = await createQueryBuilder()
        .select(["l.line_Name lineName", "l.line_Name_H company"])
        .from("line_mst", "l")
        .innerJoin("station_mst", "s", "l.line_Cd = s.line_Cd")
        .where("s.station_G_Cd = :code", { code })
        .limit(20)
        .getRawMany<{ lineName: string; company: string }>();
      return { stationName: station.name, lines };
    })
  );
  res.status(200).json(stationLines);
}
