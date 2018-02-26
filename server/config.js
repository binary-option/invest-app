module.exports = {
  // This secret should be in an environment variable instead
  jwtSecret:
    process.env.JWT_SECRET || "bbc866aff526975c512e2ecb71f32ecabee78999",
  jwtSession: {
    session: false
  }
};
