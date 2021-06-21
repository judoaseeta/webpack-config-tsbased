import { Configuration, ResolveOptions } from 'webpack'

export default function resolveConfig(resolve: ResolveOptions): Configuration {
    return {
        resolve,
    }
}
