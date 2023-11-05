// postcss.config.js
import postcssCustomMedia from "postcss-custom-media";
import postcssPresetEnv from "postcss-preset-env";

const config = {
  plugins: [
    // postcssJitProps(OpenProps),
    postcssCustomMedia(),
    postcssPresetEnv(),
    // postcssPresetEnv({ stage: 3 }),
  ],
};

export default config;
