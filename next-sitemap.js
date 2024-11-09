
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policy: [
      {
        userAgent: '*',
        disallow: ['/api', '/_next', '/404'],
      },
    ],
  },
  changefreq: 'monthly',
  priority: 0.8,
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path,
        priority: 1.0,
      };
    }
  },
};
