import { Configuration, Entry } from 'webpack'

export default function entryConfig(entry: Entry): Configuration {
    return {
        entry,
    }
}
