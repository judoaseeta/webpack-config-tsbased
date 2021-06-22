import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { StyleSheetConfigModuleParams, Options } from '../../types'

export interface ScssConfigModuleParams extends StyleSheetConfigModuleParams {
    scssOptions?: Options
}
/** *
 * SCSS를 스타일시트로 사용하는 경우의 콘픽.
 *
 */

export default function scss({
    cssOptions,
    cssExtractLoaderOptions,
    cssExtractPluginOptions,
    scssOptions,
    styleLoaderOptions,
}: ScssConfigModuleParams = {}): Configuration {
    return {
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        /**
                         * 'production'환경인 경우 css파일 형태로 스타일시티를 배출,
                         * 그렇지 않으면 style-loader를 통해 html에 스타일 부착
                         */
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
                        {
                            loader: 'sass-loader',
                            options: scssOptions,
                        },
                    ],
                },
            ],
        },
        plugins: [new MiniCssExtractPlugin(cssExtractPluginOptions)],
    }
}
