const { getDefaultConfig } = require('@expo/metro-config');


module.exports = (async () => {
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

defaultConfig.resolver.extraNodeModules = {
    'react-native-reanimated': require.resolve('react-native-reanimated'),
    
  };


return defaultConfig;
})();

