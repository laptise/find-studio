// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Like } from "typeorm";
import { connectToDb } from "../../db";
import StationByLines from "../../entities/station-by-lines";
import stations from "../../lines.json";
type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { query } = req;
  const { value } = query;
  console.log(value);
  const db = await connectToDb();
  const count = await db.getRepository(StationByLines).find({ stationName: Like(`${value}%`) });
  console.log(count);

  if (stations instanceof Object) res.status(200).json(stations as any);
}
