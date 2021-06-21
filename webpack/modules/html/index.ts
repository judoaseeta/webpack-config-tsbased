import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'

export default function html(options: Partial<HtmlWebpackPlugin['options']>): Configuration {
    return {
        plugins: [new HtmlWebpackPlugin(options)],
    }
}
