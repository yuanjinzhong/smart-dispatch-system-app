import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  
  // 图片配置
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  
  // PWA配置（可选）
  // 如需PWA支持，安装 next-pwa 并取消注释
  // ...withPWA({
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  // }),
};

export default nextConfig;
