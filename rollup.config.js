// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import browsersync from 'rollup-plugin-browsersync';

export default {
  input: './src/main.js',
  output: {
    file: 'bundle.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    sass({
      output: "bundle.css",
      options: {
        importer(path) {
          return { file: path.replace(/^~/, 'node_modules/') };
        }
      }
    }),
    browsersync({server: '.'})
  ]
};