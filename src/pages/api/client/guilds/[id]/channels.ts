import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../../../util/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, channel_id } = req.query;

  if (req.method === "GET") {
    try {
      const { data } = await axios.get(
        "https://discordapp.com/api/v9/guilds/" + id + "/channels",
        {
          headers: {
            Authorization: `Bot ${process.env.CLIENT_TOKEN}`,
          },
        }
      );
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  }

  if (req.method === "POST") {
    try {
      const { data } = await axios.get(
        "https://discordapp.com/api/v9/channels/" + channel_id,
        {
          headers: {
            Authorization: `Bot ${process.env.CLIENT_TOKEN}`,
          },
        }
      );
      res.send(data);
    } catch (e: any) {
      res.send({ error: e.message });
    }
  }
};

export default withSession(handler);
