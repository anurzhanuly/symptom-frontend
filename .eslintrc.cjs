module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    extends: [
        'plugin:vue/strongly-recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': ['error', { singleQuote: true }],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/no-multiple-template-root': 0,
        'vue/multi-word-component-names': 0,
        'vue/no-v-html': 0,
        'vue/no-reserved-component-names': 'warn',
        'import/no-unresolved': 0,
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'vue/no-v-model-argument': 'off',
        'import/prefer-default-export': 0,
        'no-magic-numbers': 0,
        'vue/block-lang': [
            'error',
            {
                script: {
                    lang: 'ts',
                },
            },
        ],
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION', // 'is', 'v-is'
                    'LIST_RENDERING', // 'v-for item in items'
                    'CONDITIONALS', // 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
                    'RENDER_MODIFIERS', // 'v-once', 'v-pre'
                    'GLOBAL', // 'id'
                    ['UNIQUE', 'SLOT'], // 'ref', 'key', 'v-slot', 'slot'
                    'TWO_WAY_BINDING', // 'v-model'
                    'OTHER_DIRECTIVES', // 'v-custom-directive'
                    'OTHER_ATTR', // 'custom-prop="foo"', 'v-bind:prop="foo"', ':prop="foo"'
                    'EVENTS', // '@click="functionCall"', 'v-on="event"'
                    'CONTENT', // 'v-text', 'v-html'
                ],
                alphabetical: true,
            },
        ],
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'key',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    ['provide', 'inject'],
                    'ROUTER_GUARDS',
                    'layout',
                    'middleware',
                    'validate',
                    'scrollToTop',
                    'transition',
                    'loading',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'emits',
                    'setup',
                    'asyncData',
                    'data',
                    'fetch',
                    'head',
                    'computed',
                    'watch',
                    'watchQuery',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError',
                ],
            },
        ],
    },
};
