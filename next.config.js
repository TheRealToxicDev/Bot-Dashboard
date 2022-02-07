/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com"],
  },
  env: {
    MONGODB_NAME: '',
    MONGODB_URI: '',
    COOKIE_SECRET: '',
    CLIENT_ID: '',
    CLIENT_SECRET: '',
    CLIENT_TOKEN: '',
    API_URI: '',
    PRODUCTION_URL: '',
    BASE_CALLBACK: '',
    DEV_CALLBACK: '',
    DEV_ENVIRONMENT: true
  },
  async redirects() {
    return [
      {
        source: "/invite",
        permanent: true,
        destination:
          "",
      },
      {
        source: "/discord",
        permanent: true,
        destination: ''
      }
    ];
  },
};
