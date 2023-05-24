/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:vue/recommended", "eslint:recommended"],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    plugins: ["vue", "@typescript-eslint"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "import/prefer-default-export": "off",
        "jsdoc/require-param-description": "off",
        "jsdoc/no-undefined-types": "off",
        "vue/multi-word-component-names": "off",
        "vue/max-attributes-per-line": ["error", { singleline: 1 }],
        "vue/no-reserved-component-names": ["warn"],
        "no-underscore-dangle": "warn",
        "vue/no-multiple-template-root": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "vue/singleline-html-element-content-newline": 0,
        "max-len": ["error", { code: 170, ignoreComments: true }],
        "vue/block-lang": [
            "error",
            {
                script: {
                    lang: "ts"
                }
            }
        ],
        "vue/attributes-order": [
            "error",
            {
                order: [
                    "DEFINITION", // 'is', 'v-is'
                    "LIST_RENDERING", // 'v-for item in items'
                    "CONDITIONALS", // 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
                    "RENDER_MODIFIERS", // 'v-once', 'v-pre'
                    "GLOBAL", // 'id'
                    ["UNIQUE", "SLOT"], // 'ref', 'key', 'v-slot', 'slot'
                    "TWO_WAY_BINDING", // 'v-model'
                    "OTHER_DIRECTIVES", // 'v-custom-directive'
                    "OTHER_ATTR", // 'custom-prop="foo"', 'v-bind:prop="foo"', ':prop="foo"'
                    "EVENTS", // '@click="functionCall"', 'v-on="event"'
                    "CONTENT" // 'v-text', 'v-html'
                ],
                alphabetical: false
            }
        ],
        "vue/html-self-closing": [
            "error",
            {
                html: {
                    void: "any",
                    normal: "always",
                    component: "always"
                },
                svg: "always",
                math: "always"
            }
        ],
        "vue/component-name-in-template-casing": [
            "error",
            "kebab-case",
            {
                registeredComponentsOnly: true
            }
        ],
        "vue/component-definition-name-casing": ["error", "PascalCase"],
        "vue/match-component-file-name": [
            "error",
            {
                extensions: ["vue"],
                shouldMatchCase: true
            }
        ],
        "vue/order-in-components": [
            "error",
            {
                order: [
                    "el",
                    "name",
                    "key",
                    "parent",
                    "functional",
                    ["delimiters", "comments"],
                    ["components", "directives", "filters"],
                    "extends",
                    "mixins",
                    ["provide", "inject"],
                    "ROUTER_GUARDS",
                    "layout",
                    "middleware",
                    "validate",
                    "scrollToTop",
                    "transition",
                    "loading",
                    "inheritAttrs",
                    "model",
                    ["props", "propsData"],
                    "emits",
                    "setup",
                    "asyncData",
                    "data",
                    "fetch",
                    "head",
                    "computed",
                    "watch",
                    "watchQuery",
                    "LIFECYCLE_HOOKS",
                    "methods",
                    ["template", "render"],
                    "renderError"
                ]
            }
        ]
    }
};
