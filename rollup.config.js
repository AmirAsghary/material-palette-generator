import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' }),
        process.env.NODE_ENV === 'production' && uglify(),
    ]
};