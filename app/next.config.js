/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  externals: {
    typeorm: "commonjs typeorm",
    mysql: "commonjs mysql",
  },
  i18n: {
    locales: ["ja-JP"],
    defaultLocale: "ja-JP",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    formats: ["image/avif", "image/webp"],
  },
};
