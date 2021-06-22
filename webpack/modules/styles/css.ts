import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { StyleSheetConfigModuleParams } from '../../types'

export type CssConfigModuleParams = StyleSheetConfigModuleParams

export default function css({
    cssOptions,
    cssExtractLoaderOptions,
    cssExtractPluginOptions,
    styleLoaderOptions,
}: CssConfigModuleParams = {}): Configuration {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        process.env.NODE_ENV === 'production'
                            ? {
                                  loader: MiniCssExtractPlugin.loader,
                                  options: cssExtractLoaderOptions,
                              }
                            : {
                                  loader: 'style-loader',
                                  options: styleLoaderOptions,
                              },
                        {
                            loader: 'css-loader',
                            options: cssOptions,
                        },
                    ],
                },
            ],
        },
        plugins: [new MiniCssExtractPlugin(cssExtractPluginOptions)],
    }
}
