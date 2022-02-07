import { Guild, User } from "./src/typings/types";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
    guilds?: Array<Guild>;
  }
}
