import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { withSession } from "../../../../../util/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, prefix } = req.query;

  if (req.method === "GET") {
    try {
      const db = await dbConnect();
      const data = await db.collection("prefix").findOne({ guildId: id });
      if (!data) return res.send({ error: "Couldn't find data" });
      if (data) return res.send(data);
    } catch (e) {
      res.send(e);
    }
  }

  if (req.method === "POST") {
    try {
      if (!prefix) return res.send({ error: "No prefix value provided." });
      const db = await dbConnect();
      const data = await db.collection("prefix").findOne({ guildId: id });
      if (!data) {
        const newData = await db.collection("prefix").insertOne({
          guildId: id,
          prefix,
        });

        res.send(await db.collection("prefix").findOne({ guildId: id }));
      }
      if (data) {
        db.collection("prefix").updateOne(
          {
            guildId: id,
          },
          {
            $set: {
              prefix: prefix,
            },
          }
        );
      }
    } catch (e) {
      res.send(e);
    }
  }
};

export default withSession(handler);
