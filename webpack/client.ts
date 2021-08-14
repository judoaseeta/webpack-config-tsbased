import path from 'path'
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
// types
import { WEBPACK_ARGS, WEBPACK_ENV } from './types'
// webpack modules
import modules from './modules'

/**
 *  root: root디렉토리
 *  build: build 디렉토리(default: root/build)
 *  htmlTemplate: html template파일
 *  devPort: devserver port
 *  alias: 절대경로 관련 설정 => root의 tsconfig.path.json 참고
 */
const root = path.parse(__dirname).dir
const htmlTemplate = path.join(__dirname, './template.html')

/*
    공통으로 사용될 웹팩 설정 모듈 정의
*/
const commonConfigs = merge([
    modules.assets.image(),
    modules.assets.font(),
    modules.utils.eslint(),
    modules.configs.target('web'),
    modules.configs.resolve({
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    }),
])
/**
 *
 * 개발용으로 사용될 웹팩 설정 모듈 정의
 */

const devConfigs = merge([
    modules.styles.css({
        cssOptions: {
            modules: {
                auto: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
        },
        cssExtractPluginOptions: {
            filename: '[name]_[contenthash].css',
        },
    }),
    modules.styles.scss({
        cssOptions: {
            modules: {
                auto: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
        },
        cssExtractPluginOptions: {
            filename: '[name]_[contenthash].css',
        },
    }),
    modules.javascript.typeScriptOnly({
        options: {
            configFile: path.join(root, './tsconfigs/dev/tsconfig.json'),
        },
    }),
    modules.html({
        template: htmlTemplate,
        title: 'WEBPACK_TYPESCRIPT_TEMPLATE',
    }),
    modules.configs.entry(path.join(root, './src/index.tsx')),
    modules.utils.devServer({
        historyApiFallback: true,
        port: 3000,
        contentBase: path.join(root, './public'),
        publicPath: '/',
        inline: true,
        noInfo: true,
    }),
    modules.configs.output({
        publicPath: '/',
    }),
    modules.utils.dotEnv(path.join(root, '/.env')),
])
/**
 *
 * 배포용으로 사용될 웹팩 설정 모듈 정의
 */
const productionConfigs = merge([
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
    modules.javascript.typeScriptOnly({
        options: {
            configFile: path.join(root, './tsconfigs/prod/tsconfig.json'),
        },
    }),
    modules.html({
        title: 'production',
        filename: `index.html`,
        template: htmlTemplate,
    }),
    modules.configs.entry(path.join(root, './src/index.tsx')),
    modules.configs.output({
        path: `${process.cwd()}/build`,
        filename: '[name].[chunkhash].prod.js',
        publicPath: '/',
    }),
    modules.styles.optimize(),
    modules.utils.clean(),
    modules.utils.environment({}),
])

/**
 *
 * @param mode : webpack cli상에서 인자로 전달해주는 mode( process.env.NODE_ENV와 다름)
 */
export default function config(env: WEBPACK_ENV, args: WEBPACK_ARGS): Configuration {
    const { mode } = args
    if (mode === 'development') {
        return merge(commonConfigs, devConfigs, {
            mode,
        })
    }
    if (mode === 'production') {
        return merge(commonConfigs, productionConfigs, {
            mode,
        })
    }
    // 'development' 와 'production' 둘 다 아니라면 에러 배출
    throw new Error('웹팩 CLI상에서 주어진 MODE를 확인해보세요')
}
