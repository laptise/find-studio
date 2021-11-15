// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseEntity, createQueryBuilder, getConnection, getRepository, Like } from "typeorm";
import { getDb, getTable, prepareConnection } from "../../db";
import { Station } from "../../entities/station";
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
  const stations = await createQueryBuilder(Station)
    .select(["max(stationName) as name", "stationGCd code"])
    .where({ stationName: Like(`${name}%`) })
    .groupBy("stationGCd")
    .getRawMany<{ name: string; code: number }>();
  const stationLines = await Promise.all(
    stations.map(async (station) => {
      const { code } = station;
      const lines = await createQueryBuilder()
        .select(["l.lineName lineName", "l.lineNameH company"])
        .from("line", "l")
        .innerJoin("station", "s", "l.lineCd = s.lineCd")
        .where("s.stationGCd = :code", { code })
        .getRawMany<{ lineName: string; company: string }>();
      return { stationName: station.name, lines };
    })
  );
  res.status(200).json(stationLines);
}
