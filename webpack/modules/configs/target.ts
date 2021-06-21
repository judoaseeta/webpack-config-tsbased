import { Configuration } from 'webpack'
import { Target } from '../../types'

export default function targetConfig(target: Target): Configuration {
    return {
        target,
    }
}
