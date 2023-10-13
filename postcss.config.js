// postcss.config.js
import OpenProps from "open-props";
import postcssCustomMedia from "postcss-custom-media";
import postcssJitProps from "postcss-jit-props";
import postcssPresetEnv from "postcss-preset-env";

const config = {
  plugins: [
    postcssJitProps(OpenProps),
    postcssPresetEnv(),
    postcssCustomMedia(),
  ],
};

export default config;
