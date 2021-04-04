import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'index.js',
    output: [
      {
        file: './dist/trono.js',
        format: 'iife',
        name: '$'
      },
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  {
    input: 'index.js',
    output: [
      {
        file: './dist/trono.mjs.js',
        format: 'es',
        plugins: [terser()]
      },
      {
        file: './dist/trono.min.js',
        format: 'iife',
        name: '$',
        plugins: [terser()]
      }
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  }
];