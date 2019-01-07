module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/coverage/**',
  ],
};