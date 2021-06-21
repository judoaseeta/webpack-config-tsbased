import { HotModuleReplacementPlugin } from 'webpack'
import { Configuration as DevServerConfig } from 'webpack-dev-server'

export default function devServer(config: DevServerConfig) {
    return {
        devServer: config,
        plugins: [new HotModuleReplacementPlugin()],
    }
}
