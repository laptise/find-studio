// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseEntity, createQueryBuilder, getConnection, getRepository, Like } from "typeorm";
import { prepareConnection } from "../../db";
import { PrefectureMst } from "../../entities/prefectureMst";
import { StationMst } from "../../entities/stationsMst";
import stations from "../../lines.json";
type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PrefectureMst[]>) {
  const { query } = req;
  if (Object.keys(query).length === 0) await getAll(res);
}

async function getAll(res: NextApiResponse<PrefectureMst[]>) {
  await prepareConnection();
  const result = await getRepository(PrefectureMst).find();
  res.status(200).json(result);
}
