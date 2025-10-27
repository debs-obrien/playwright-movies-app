import { NextConfig } from 'next'

const config: NextConfig = {  
  basePath: process.env.BASEPATH,
  output: 'export',
  webpack(config) {
    // Add SVGR loader for SVG files
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default config;
