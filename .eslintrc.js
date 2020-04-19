module.exports = {
	root: true,
	env: {
		node: true
	},
	plugins: ["@typescript-eslint"],
	extends: [
		'eslint:recommended',
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		'plugin:vue/essential',
		'@vue/typescript/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'@typescript-eslint/ban-ts-ignore': ["off"],
		'@typescript-eslint/no-explicit-any': ["off"],
		indent: ["warn", "tab"],
		'no-unused-vars': ["warn"],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				mocha: true
			}
		}
	]
}
