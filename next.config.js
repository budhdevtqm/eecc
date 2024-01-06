/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_HOST: "localhost",
    DB_PASSWORD: "Password@1234",
    DB_USER: "root",
    DATABASE: "eCommerce",
    ACCESS_TOKEN_SECRET:
      "ab7a3de3ac0d63336ce98315661611122168743addab37cc27282351c6417bf0",
    STRIPE_PUBLIC:
      "pk_test_51Ni8QKSCTH8hN1ApcaWIX7ejucWbSbhKiQixuBSixaYY8Y7JqddeZYgNwfBPjTtfLDwy3Yzh2ByWpio08FokXhjs00i94xHh38",
    STRIPE_SECRET:
      "sk_test_51Ni8QKSCTH8hN1Ap1a7Rg359ifaiaxOKkIZdbii24aCuVBjFxTTjdNqF2Aec1ENZcdYvyrW6tZKkRTZSGE7J93Do00jEKfFbSz",
    EMAIL: "budhdevtqm@gmail.com",
    EMAIL_PASSWORD: "higvoomsskwbndld",
  },
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

module.exports = nextConfig;
