import { NextApiRequest, NextApiResponse } from "next";
import { getRepository } from "typeorm";
import { Dao } from "../../../dao";
import { getDb } from "../../../db";
import { Studio } from "../../../entities/studio";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Studio>) {
  const id = Number(req.query?.id);
  const result = await Dao.Studio.getStudioFromId(id);
  if (result) res.status(200).json(result);
}
