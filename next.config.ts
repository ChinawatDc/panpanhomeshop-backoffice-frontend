import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

console.log('>>> Using next-intl config at:', path.resolve('./next-intl.config.ts'));

const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');

const nextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
