module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!src/example/**/*.{js}',
    '!src/index.js',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/coverage/**',
  ],
};
