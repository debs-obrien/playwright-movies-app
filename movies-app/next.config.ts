import { NextConfig } from 'next'
import path from 'path'

const config: NextConfig = {  
  basePath: process.env.BASEPATH,
  output: 'export',
  turbopack: {
    root: path.resolve(__dirname, '..'),
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    // Add SVGR loader for SVG files (for production builds that still use webpack)
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default config;
