import { Configuration } from 'webpack'

export default function clean(): Configuration {
    return {
        output: {
            clean: true,
        },
    }
}
