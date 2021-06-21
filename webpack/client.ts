import path from 'path'
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
// types
import { WEBPACK_ARGS, WEBPACK_ENV } from './types'
// webpack modules
import modules from './modules'

const root = path.parse(__dirname).dir
/*
    공통으로 사용될 웹팩 설정 모듈 정의
*/
const commonConfigs = merge([
    modules.javascript.typeScriptOnly(),
    modules.styles.scss({
        options: {
            modules: true,
        },
    }),
    modules.utils.eslint(),
    modules.configs.target('web'),
    modules.configs.resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    }),
])
/**
 *
 * 개발용으로 사용될 웹팩 설정 모듈 정의
 */

const devConfigs = merge([
    modules.html({
        template: path.join(__dirname, './index_dev.html'),
    }),
    modules.configs.entry(path.join(root, './src/index.tsx')),
    modules.utils.devServer({
        historyApiFallback: true,
        inline: true,
        port: 8000,
        hot: true,
        contentBase: '/dist',
        publicPath: '/',
    }),
])
/**
 *
 * 배포용으로 사용될 웹팩 설정 모듈 정의
 */
const productionConfigs = merge([modules.configs.entry(path.join(__dirname, '/src/index.tsx')), modules.utils.clean()])

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