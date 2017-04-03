import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const prod = process.env.PRODUCTION;
const mode = prod ? 'production' : 'development';

console.log(`Creating ${mode} bundle...`)

const targets = prod
  ? [
    { dest: 'dist/jsty.min.js', format: 'umd' },
  ]
  : [
    { dest: 'dist/jsty.js', format: 'umd' }
  ];

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
  babel()
];

if (prod) plugins.push(uglify());

export default {
  entry: 'src/index.js',
  moduleName: 'jsty',
  exports: 'named',
  targets,
  plugins
}
