import webpack, { Configuration } from 'webpack'

export default function enviromentConfig(config: webpack.DefinePlugin['definitions']): Configuration {
    return {
        plugins: [new webpack.DefinePlugin(config)],
    }
}
