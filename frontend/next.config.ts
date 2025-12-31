import { getGraphicAppBaseUrl } from '@/utils/getGraphicAppBaseUrl';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/graphicApp/:path*',
        destination: `${getGraphicAppBaseUrl()}/:path*`,
      },
    ];
  },
};

export default nextConfig;
