import { NextConfig } from 'next'
import path from 'path'

const config: NextConfig = {  
  basePath: process.env.BASEPATH,
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  output: 'export',
};

export default config;
