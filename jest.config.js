module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!src/example/**/*.{js}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/coverage/**',
  ],
};
