const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'ENABLED',
})
const withPWA = require('next-pwa')

module.exports = withPlugins(
    [
        withBundleAnalyzer,
        {
            reactStrictMode: true,
            swcMinify: true,
            pageExtensions: ['js', 'tsx', 'mdx'],
            images: {
                domains: ['raw.githubusercontent.com'],
            },
            webpack: (config, { dev, isServer }) => {
                config.module.rules.push(
                    {
                        test: /\.(png|jpe?g|gif|mp4)$/i,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    publicPath: '/_next',
                                    name: 'static/media/[name].[hash].[ext]',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack'],
                    }
                )

                if (!dev && !isServer) {
                    Object.assign(config.resolve.alias, {
                        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
                        react: 'preact/compat',
                        'react-dom/test-utils': 'preact/test-utils',
                        'react-dom': 'preact/compat',
                    })
                }

                return config
            },
        },
    ],
    [
        withPWA,
        {
            pwa: {
                dest: 'public',
            },
        },
    ]
)
