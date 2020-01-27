module.exports = {
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
    },
  },
};
