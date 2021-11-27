// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Params } from "next/dist/server/router";
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
  const result = await resolver(query);
  res.status(200).json(result);
}

async function resolver(param: Params) {
  if (Object.keys(param).length === 0) {
    return await getAll();
  } else {
    return withCondition(param);
  }
}

async function getAll() {
  await prepareConnection();
  return await getRepository(PrefectureMst).find();
}

async function withCondition(param: Params) {
  let query = createQueryBuilder(PrefectureMst).select();
  if (param["name"]) {
    const nameLike = `${param["name"]}%`;
    query = query.where("name like :nameLike", { nameLike });
  }
  return await query.getMany();
}
