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
      body,
    } = req;

    await client.item.update({
      where: {
        id: +id.toString(),
      },
      data: body,
    });

    res.json({
      ok: true,
    });
  }
}
