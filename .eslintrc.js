module.exports = {
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  root: true,
  rules: {
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "no-unused-vars": ["error", { argsIgnorePattern: "req|res|next" }],
  },
};

//  "max"(default 300) enforces a maximum number of lines in a file
// "skipBlankLines": true ignore lines made up purely of whitespace.
// "skipComments": true ignore lines containing just comments
