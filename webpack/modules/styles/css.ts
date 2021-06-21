import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ConfigModuleParams } from '../../types'

export type CssConfigModuleParams = ConfigModuleParams

export default function css({ options }: CssConfigModuleParams = {}): Configuration {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        process.env.NODE_ENV === 'production'
                            ? {
                                  loader: MiniCssExtractPlugin.loader,
                                  options,
                              }
                            : 'style-loader',
                        {
                            loader: 'css-loader',
                            options,
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
    }
}
