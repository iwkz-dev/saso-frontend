module.exports = {
  images: {
    domains: ['via.placeholder.com', 'ik.imagekit.io'],
  },
  env: {
    EVENT_TYPE: process.env.EVENT_TYPE,
    NEXT_PUBLIC_BASE_URL_HOST: process.env.NEXT_PUBLIC_BASE_URL_HOST,
  },
  reactStrictMode: true,
};
