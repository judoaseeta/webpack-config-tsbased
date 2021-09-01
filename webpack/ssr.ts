import path from 'path'
import { merge } from 'webpack-merge'
import { Configuration, ProgressPlugin } from 'webpack'
// types
import webpackNodeExternals from 'webpack-node-externals'
import { WEBPACK_ARGS, WEBPACK_ENV } from './types'
// webpack modules
import modules from './modules'

const root = path.parse(__dirname).dir
const ssrConfig = merge([
    modules.configs.target('node'),
    modules.assets.image(),
    modules.assets.font(),
    modules.utils.eslint(),
    modules.configs.resolve({
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    }),
    modules.styles.css({
        cssOptions: {
            modules: true,
        },
    }),
    modules.styles.scss({
        cssOptions: {
            modules: true,
        },
    }),
    modules.javascript.tsBabel(
        {
            options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties', '@loadable/babel-plugin'],
            },
        },
        {
            options: {
                configFile: path.join(root, './tsconfigs/ssr/tsconfig.json'),
            },
        },
    ),
    modules.configs.entry(path.join(root, './ssr/server.tsx')),
    modules.configs.output({
        clean: true,
        path: `${process.cwd()}/ssrbuild`,
        filename: 'main.js',
        publicPath: '/',
        globalObject: `typeof self !== 'undefined' ? self : this`,
    }),
    modules.utils.loadable(),
])

/**
 *
 * @param mode : webpack cli상에서 인자로 전달해주는 mode( process.env.NODE_ENV와 다름)
 */
export default function config(env: WEBPACK_ENV, args: WEBPACK_ARGS): Configuration {
    const { mode } = args
    if (mode === 'production') {
        return merge(ssrConfig, {
            mode,
            externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
            externals: [webpackNodeExternals() as any],
            plugins: [new ProgressPlugin()],
        })
    }
    // 'development' 와 'production' 둘 다 아니라면 에러 배출
    throw new Error('웹팩 CLI상에서 주어진 MODE를 확인해보세요')
}
