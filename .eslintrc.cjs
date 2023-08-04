module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
        es2021: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
    ],
    plugins: ['vue'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-indent': ['error', 4],
        'vue/no-multiple-template-root': 0,
        'vue/multi-word-component-names': 0,
        'vue/no-v-html': 0,
        'vue/no-reserved-component-names': 'warn',
        'import/no-unresolved': 0,
        'vue/no-v-text-v-html-on-component': 0,
        'no-param-reassign': [
            'error',
            {
                props: false,
            },
        ],
        'no-multi-spaces': [
            'error',
            {
                exceptions: {
                    VariableDeclarator: true,
                    ImportDeclaration:  true,
                },
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
        'vue/attributes-order': 'error',
        'vue/first-attribute-linebreak': 'error',
        'vue/html-closing-bracket-newline': 'error',
        'vue/mustache-interpolation-spacing': 'error',
        'vue/multiline-html-element-content-newline': 'error',
        'vue/component-tags-order': [
            'error',
            {
                order: [
                    'script[setup]',
                    'template',
                    'script:not([setup])',
                    'style',
                ],
            },
        ],
    },
};
