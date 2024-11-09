module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/api", "/_next", "/404"],
      },
    ],
  },
  changefreq: "monthly",
  priority: 0.8,
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 1.0,
      };
    }

    return {
      loc: path,
      changefreq: "monthly",
      priority: 0.8,
    };
  },
};
