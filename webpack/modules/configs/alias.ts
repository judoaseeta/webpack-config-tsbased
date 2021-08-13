import { Configuration, ResolveOptions } from 'webpack'

export default function aliasConfig(alias: ResolveOptions['alias']): Configuration {
    return {
        resolve: {
            alias,
        },
    }
}
