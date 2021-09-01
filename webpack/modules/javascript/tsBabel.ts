import { Configuration } from 'webpack'
import { ConfigModuleParams } from '../../types'

export type TypeScriptOnlyConfigModuleParams = ConfigModuleParams

export default function typescriptOnly(
    { options }: TypeScriptOnlyConfigModuleParams = {},
    { options: tsOptions }: TypeScriptOnlyConfigModuleParams = {},
): Configuration {
    return {
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options,
                        },
                        {
                            loader: 'ts-loader',
                            options: tsOptions,
                        },
                    ],
                },
            ],
        },
    }
}
