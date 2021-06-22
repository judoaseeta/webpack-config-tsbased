import { Configuration } from 'webpack'

export default function image(limit = 15000): Configuration {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    parser: {
                        dataUrlCondition: {
                            maxSize: limit,
                        },
                    },
                },
                {
                    test: /\.svg$/,
                    type: 'asset',
                },
            ],
        },
    }
}
