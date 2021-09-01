import path from 'path'
import { merge } from 'webpack-merge'
import { Configuration, ProgressPlugin } from 'webpack'
// types
import { WEBPACK_ARGS, WEBPACK_ENV } from './types'
// webpack modules
import modules from './modules'

const root = path.parse(__dirname).dir
const configs = merge([
    modules.assets.image(),
    modules.assets.font(),
    modules.utils.eslint(),
    modules.configs.target('web'),
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
    modules.configs.entry(path.join(root, './src/ssr.tsx')),
    modules.configs.output({
        path: `${process.cwd()}/ssrbuild/web`,
        filename: '[name].[chunkhash].prod.js',
        publicPath: '/',
    }),
    modules.styles.optimize(),
    modules.utils.clean(),
    modules.utils.environment({}),
    modules.utils.loadable(),
])
/**
 *
 * @param mode : webpack cli상에서 인자로 전달해주는 mode( process.env.NODE_ENV와 다름)
 */
export default function config(env: WEBPACK_ENV, args: WEBPACK_ARGS): Configuration {
    const { mode } = args
    if (mode === 'production') {
        return merge(configs, {
            mode,
            plugins: [new ProgressPlugin()],
        })
    }
    // 'development' 와 'production' 둘 다 아니라면 에러 배출
    throw new Error('웹팩 CLI상에서 주어진 MODE를 확인해보세요')
}
