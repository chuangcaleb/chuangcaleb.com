// postcss.config.js
import postcssJitProps from "postcss-jit-props";
import postcssPresetEnv from "postcss-preset-env";
import OpenProps from "open-props";

const config = {
  plugins: [postcssJitProps(OpenProps), postcssPresetEnv()],
};

export default config;
