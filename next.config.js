// next.config.js

module.exports = {
    webpack: (config, { isServer }) => {
      // For server-side rendering of mongodb package
      if (isServer) {
        config.externals.push('mongodb');
      }
      return config;
    },
  };
  