import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../../../util/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const { data } = await axios.get(
      "https://discordapp.com/api/v9/guilds/" + id,
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
};

export default withSession(handler);
