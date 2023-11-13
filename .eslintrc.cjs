module.exports = {
  "root": true,

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports"
      },
    ],
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc"
        }
      }
    ],
    "quotes": [
      "error",
      "double",
      {
        "allowTemplateLiterals": true
      }
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        "arraysInObjects": true,
        "objectsInObjects": true,
      },
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true,
      },
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true,
      },
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
      },
    ],
    "rest-spread-spacing": ["error", "never"], "no-multiple-empty-lines": [
      "error",
      {
        "max": 2,
      },
    ],
    "space-before-blocks": ["error", "always"],
    /** @see https://eslint.org/docs/latest/rules/padding-line-between-statements#rule-details */
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return",
      },
      {
        "blankLine": "always",
        "prev": ["const", "let", "var"],
        "next": "*",
      },
      {
        "blankLine": "any",
        "prev": ["const", "let", "var"],
        "next": ["const", "let", "var"],
      },
      {
        "blankLine": "always",
        "prev": ["case", "default"],
        "next": "*",
      },
      {
        "blankLine": "always",
        "prev": "if",
        "next": "*",
      },
      {
        "blankLine": "always",
        "prev": "*",
        "next": "if",
      },
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always",
      },
    ],
    "switch-colon-spacing": [
      "error",
      {
        "after": true,
        "before": false,
      },
    ],
    "curly": "error",
    "semi": "error",
    "semi-spacing": "error",
    "semi-style": ["error", "last"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
      },
    ],
  },
};