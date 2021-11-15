// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BaseEntity, getConnection, Like } from "typeorm";
import { getDb, prepareConnection } from "../../db";
import { Station } from "../../entities/station";
import stations from "../../lines.json";
type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { query } = req;
  const { value } = query;
  console.log(value);
  await prepareConnection();
  const db = await getDb();
  console.log(Station);
  const rep = await Station.find();
  console.log(rep);

  if (stations instanceof Object) res.status(200).json(stations as any);
}
