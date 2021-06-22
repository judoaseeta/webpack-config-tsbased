import { Configuration } from 'webpack'

export default function font(limit = 50000): Configuration {
    return {
        module: {
            rules: [
                {
                    test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: limit,
                        },
                    },
                },
            ],
        },
    }
}
