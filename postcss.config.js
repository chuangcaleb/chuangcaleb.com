// postcss.config.js
import postcssCustomMedia from "postcss-custom-media";
import postcssPresetEnv from "postcss-preset-env";

const config = {
  plugins: [
    postcssCustomMedia(),
    // postcssJitProps(OpenProps),
    // postcssPresetEnv({ stage: 3 }),
    postcssPresetEnv(),
  ],
};

export default config;
