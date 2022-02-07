import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../../../util/mongodb";
import { withSession } from "../../../../../util/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await dbConnect();
  const { id, message, channel } = req.query;

  if (req.method === "GET") {
    const data = await db
      .collection("welcome-messages")
      .findOne({ guildId: id });
    if (!data) return res.send({ error: "Couldn't find data" });
    if (data) {
      res.send(data);
    }
  }

  if (req.method === "POST") {
    const data = await db
      .collection("welcome-messages")
      .findOne({ guildId: id });
    if (!data) {
      await db.collection("welcome-messages").insertOne({
        guildId: id,
        message,
        channel,
      });
    }

    if (data) {
      await db.collection("welcome-messages").updateOne(
        {
          guildId: id,
        },
        {
          $set: {
            message: message ? message : data.message,
            channel: channel ? channel : data.channel,
          },
        }
      );
    }
  }
};

export default withSession(handler);
