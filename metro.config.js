const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

// Add 'cjs' extension support
defaultConfig.resolver.sourceExts.push('cjs');

// Apply NativeWind config
module.exports = withNativeWind(defaultConfig, { input: './app/global.css' });
