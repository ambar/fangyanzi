/** @type {import('next').NextConfig} */
const nextConfig = {
  // 让 router 工作正常
  ...(process.env.NEXT_PUBLIC_BASE_PATH && {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  }),
  // 让部署工作正常
  // https://nextjs.org/docs/deployment#static-only
  ...(process.env.NEXT_PUBLIC_ASSET_PREFIX && {
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
  }),
}

module.exports = nextConfig
