/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    output: 'standalone',
    webpack: (config, { isServer }) => {
        config.resolve.alias['~'] = path.join(__dirname, 'src')
        return config
    },
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    }
}

module.exports = nextConfig
