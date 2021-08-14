import { Configuration } from 'webpack'
import DotEnv from 'dotenv-webpack'

export default function dotEnv(path: string): Configuration {
    return {
        plugins: [
            new DotEnv({
                path,
                systemvars: true,
            }),
        ],
    }
}
