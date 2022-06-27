import { ItemType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const characters = await client.character.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        job: true,
        level: true,
        items: {
          select: {
            addi: true,
            flame: true,
            name: true,
            id: true,
            poten: true,
            star: true,
            type: true,
            status: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      characters,
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, level, job },
    } = req;
    const foundCharacter = await client.character.findUnique({
      where: {
        name,
      },
    });

    if (foundCharacter) {
      res.json({ ok: false });
    } else {
      const emptyItems = Object.values(ItemType).map((type) => {
        return { type, name: "공백" };
      });
      const newCharacter = await client.character.create({
        data: {
          name,
          level: +level,
          job,
          items: {
            createMany: {
              data: emptyItems,
            },
          },
        },
      });

      res.json({ ok: true });
    }
  }
}
