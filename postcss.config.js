// Postcss.config.js
// import postcssCustomMedia from "postcss-custom-media";
import postcssPresetEnv from 'postcss-preset-env';

const config = {
	plugins: [
		// PostcssJitProps(OpenProps),
		// postcssCustomMedia(),
		postcssPresetEnv({stage: 3, minimumVendorImplementations: 2}),
	],
};

export default config;
