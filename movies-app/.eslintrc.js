
module.exports = {
  extends: ["next", "next/core-web-vitals"],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    "@next/next/no-img-element": 0, // TODO: Remove when Image component is updated
    "react/display-name": 0,
    "no-unused-vars": 1,
    "react/no-unknown-property": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "no-console": 0,
    "no-undef": 1,
    "no-empty": 1,
    "no-dupe-keys": 2,
  },
};
