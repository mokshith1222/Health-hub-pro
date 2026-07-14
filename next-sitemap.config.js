module.exports = {
  siteUrl: process.env.SITE_URL || 'https://healthhubpro.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/.next'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
      },
    ],
    host: process.env.SITE_URL || 'https://healthhubpro.com',
  },
  exclude: [
    '/404',
    '/500',
    '/_app',
    '/_document',
    '/_error',
    '/api/*',
  ],
  additionalPaths: async () => {
    const paths = [
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.5,
      },
      {
        loc: '/privacy',
        changefreq: 'monthly',
        priority: 0.3,
      },
      {
        loc: '/calculators',
        changefreq: 'weekly',
        priority: 0.8,
      },
    ]
    return paths
  },
}
