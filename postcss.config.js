// postcss.config.js
import postcssCustomMedia from "postcss-custom-media";
import postcssPresetEnv from "postcss-preset-env";

const config = {
  plugins: [
    // postcssJitProps(OpenProps),
    // postcssPresetEnv({ stage: 3 }),
    postcssCustomMedia(),
    postcssPresetEnv(),
  ],
};

export default config;
