import process from 'node:process';
import autoprefixer from 'autoprefixer';
import presetEnv from 'postcss-preset-env';

const config = {
	plugins: [
		presetEnv({
			stage: 1,
			// minimumVendorImplementations: 2, // default
			features: {
				'nesting-rules': true,
			},
		}),
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
