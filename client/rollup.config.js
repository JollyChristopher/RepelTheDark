import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  browser: true,
  input: 'js/index.js',
  output: {
    dir: 'html',
    format: 'cjs'
  },
  plugins: [nodeResolve()]
};