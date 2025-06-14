// Postcss.config.js
// import postcssCustomMedia from "postcss-custom-media";
import process from 'node:process';
import postcssPresetEnv from 'postcss-preset-env';
import autoprefixer from 'autoprefixer';

const config = {
	plugins: [
		// PostcssJitProps(OpenProps),
		// postcssCustomMedia(),
		postcssPresetEnv({stage: 3, minimumVendorImplementations: 2}),
		// cssnano — astro minimises css by default
		...(process.env.NODE_ENV === 'production' ? [autoprefixer] : []),
	],
};

export default config;

// Astro handles by default:
// minification —cssnano
// css modules
// import — postcss-import
// url handling — postcss-url
