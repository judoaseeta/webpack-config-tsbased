import { Configuration } from 'webpack'
import { Output } from '../../types'

export default function outputFunc(output: Output): Configuration {
    return {
        output,
    }
}
