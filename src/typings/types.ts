export const invite = (id?: string) =>
  `https://discord.com/oauth2/authorize?client_id=928816793831759872&permissions=1644959362263&scope=bot%20applications.commands${
    id ? `&guild_id=${id}` : ""
  }`;

/**
 * User
 */

export interface User {
  accent_color: string;
  avatar: string;
  banner: string;
  banner_color: string;
  discriminator: string;
  email: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  public_flags: number;
  token: string;
  username: string;
  verified: boolean;
  developer: boolean;
  moderator: boolean;
  botModerator: boolean;
  honorable: boolean;
  modManager: boolean;
  perks: boolean;
  admin: boolean;
}

export interface UserData {
  id: string;
  name: string;
  discriminator: string;
  avatar: string;
  developer: boolean;
  moderator: boolean;
  botModerator: boolean;
  honorable: boolean;
  modManager: boolean;

  _id?: string;
  banner?: string;
  vanity?: string;
  socials?: Record<string, string>;
  about?: string;
  perks?: boolean;
  position?: string;
}

export interface PageProps {
  user?: User;
}

/**
 * Profile
 */

export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  discriminator: number;
  avatar: string;
  accent_color: number | null;
  banner: string | null;
}

/**
 * Guild
 */

export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: Array<string>;
}

export interface GuildChannel {
  id: string;
  type: number;
  name: string;
  position: number;
  parent_id: string;
  topic: string;
  guild_id: string;
  permission_overwrites: Array<string>;
  nsfw: boolean;
  rate_limit_per_user: number;
  banner: string;
}

/**
 * Functions
 */

export const doNothing = () => {
  return (async () => {
    null;
  })();
};
