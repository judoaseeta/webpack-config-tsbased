import { Configuration } from 'webpack'
import ESLintWebpackPlugin from 'eslint-webpack-plugin'

export default function ESLint(): Configuration {
    return {
        plugins: [new ESLintWebpackPlugin()],
    }
}
