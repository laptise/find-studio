// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import stations from "../../lines.json";
type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(typeof stations);
  console.log(stations instanceof Object);
  if (stations instanceof Object) res.status(200).json(stations as any);
}
