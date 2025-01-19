/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
};

const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
