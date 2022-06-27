import { ItemType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const {
      query: { id },
      body: { name, level, job },
    } = req;

    await client.character.update({
      where: {
        id: +id.toString(),
      },
      data: {
        name,
        level: +level,
        job,
      },
    });

    res.json({
      ok: true,
    });
  }
}
