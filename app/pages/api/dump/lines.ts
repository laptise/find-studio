// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../../db";
import Line from "../../../entities/line";
import lines from "../../../lines.json";
type Data = {
  name: string;
};

function fromData(data: any) {
  const entity = new Line(data["line_cd"]);
  entity.companyCd = data["company_cd"];
  entity.lineName = data["line_name"];
  entity.lineNameK = data["line_name_k"];
  entity.lineNameH = data["line_name_h"];
  entity.lineColorC = data["line_color_c"];
  entity.lineColorT = data["line_color_t"];
  entity.lineType = data["line_type"];
  entity.lng = data["lon"];
  entity.lat = data["lat"];
  entity.zoom = data["zoom"];
  entity.eStatus = data["e_status"];
  entity.eSort = data["e_sort"];
  return entity;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const entities = (lines as any[]).map((x) => fromData(x));
  await connectToDb().then(async (db) => {
    await db.getRepository(Line).save(entities);
  });
  res.status(200).write("ok");
}
