import { Configuration, WebpackPluginInstance } from 'webpack'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

export default function optimize(options?: CssMinimizerPlugin.Options): Configuration {
    const cssMinimizer = new CssMinimizerPlugin(options) as unknown as WebpackPluginInstance
    return {
        optimization: {
            minimizer: [cssMinimizer],
        },
    }
}
