import { Configuration } from 'webpack'
import LoadablePlugin from '@loadable/webpack-plugin'

export default function enviromentConfig(): Configuration {
    return {
        plugins: [new LoadablePlugin() as any],
    }
}
