export default () => ({
  secret: process.env.JWT_SECRET,
  accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL,
});
