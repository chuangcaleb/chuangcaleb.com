module.exports = {
  rules: {
    // turn it off until i fix it
    "@typescript-eslint/naming-convention": "off",
    // fix conflict between XO(import/extensions) and XO(n/file-extension-in-import)."never".
    "import/extensions": [
      "error",
      "never",
      {
        png: "always",
      },
    ],
  },
  prettier: true,
};
