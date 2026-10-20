import process from 'node:process';
import autoprefixer from 'autoprefixer';
import presetEnv from 'postcss-preset-env';

const config = {
	plugins: [
		// cssnano — astro minimises css by default
		...(process.env.NODE_ENV === 'production'
			? [
				autoprefixer,
				presetEnv({
					stage: 1,
					// minimumVendorImplementations: 2, // default
					features: {
						'nesting-rules': true,
						// Polyfill boosts layered selectors per file; Astro component
						// CSS lives in other files, so unlayered styles lose. Native
						// @layer is Baseline since 2022.
						'cascade-layers': false,
					},
				}),
			]
			: []),
	],
};

export default config;

// Astro handles by default:
// minification —cssnano
// css modules
// import — postcss-import
// url handling — postcss-url
