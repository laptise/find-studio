// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "../../db";
import Station from "../../entities/station";

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  connection().then(async (connection) => {
    const rep = connection.getRepository(Station);
    await rep.save(new Station(114));
    connection.close();
  });
  res.status(200).json({ name: "John Doe" });
}
