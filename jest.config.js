module.exports = {
    verbose: true,
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      ".+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$": "jest-transform-stub"    },
    moduleNameMapper: {
      '.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$': '<rootDir>/node_modules/jest-transform-stub/index.js',
    },
  };
