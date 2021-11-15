/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  externals: {
    typeorm: "commonjs typeorm",
    mysql: "commonjs mysql",
  },
};
