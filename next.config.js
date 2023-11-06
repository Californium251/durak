/** @type {import('next').NextConfig} */

const nextConfig = {
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
    webpack: (config) => {
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    }
}

module.exports = nextConfig
