/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.discordapp.com",
      "ui-avatars.com",
      "storage.airforcegaming.com",
      "roosterteeth.com",
      "www.uso.org",
      "mvgcharity.org",
      "infinitybots.gg",
      "cdn.infinitybots.xyz",
      "voidbots.net",
      "discordbotlist.com",
    ],
  },
  env: {
    MONGODB_NAME: 'containers-us-west-21',
    MONGODB_URI: 'mongodb://mongo:hF4fiWy0EMx4FhAkqv1r@containers-us-west-21.railway.app:6507',
    COOKIE_SECRET: '01tUVMH3LmnOdaMMN7eG4QmObow20hqxHWBqtyNKBb6+7xIZ2yGnOntsStOCXCmbOACgG3B1qckbpPUJCeDJxg==',
    CLIENT_ID: '936578565779116102',
    CLIENT_SECRET: 'DGRvOgX5tZgaSUP2ddhqDtOwTRi7hSb0',
    CLIENT_TOKEN: 'OTM2NTc4NTY1Nzc5MTE2MTAy.YfPOwg.r91PrFpR3Ti84CSLxwFVx-1SQqY',
    API_URI: 'https://modhub.gg/api',
    PRODUCTION_URL: 'https://modhub.gg',
    BASE_CALLBACK: 'https://protectbot.net/api/authorized',
    DEV_CALLBACK: 'http://localhost:3000/api/authorized',
    DEV_ENVIRONMENT: true
  },
  async redirects() {
    return [
      {
        source: "/invite",
        permanent: true,
        destination:
          "https://discord.com/oauth2/authorize?client_id=885954920681971723&permissions=2147822784&scope=bot%20applications.commands",
      },
      {
        source: "/discord",
        permanent: true,
        destination: 'https://discord.gg/JBgMwVuDjB'
      }
    ];
  },
};
