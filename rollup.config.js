import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
const version = process.env.VERSION || require('./package.json').version;
const banner =
  `/**
 * vue-string-render v${version}
 * (c) ${new Date().getFullYear()} zetaplus006
 * @license MIT
 */`
const input = 'src/index.ts';
const name = 'vue-string-render';
const plugins = [
  typescript(),
  filesize()
]


export default [
  {
    input,
    output: {
      name,
      file: 'lib/' + name + '.esm.js',
      format: 'es',
      banner
    },
    plugins,
    external: ['vue']
  },
  {
    input,
    output: {
      name,
      file: 'lib/' + name + '.cjs.js',
      format: 'cjs',
      banner
    },
    plugins,
    external: ['vue']
  }
]