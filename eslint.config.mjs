import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				__dirname: true,
				console: true,
				module: true,
				process: true,
				require: true,
			}
		}, 
		rules: {
			'@typescript-eslint/ban-ts-ignore': ["off"],
			'@typescript-eslint/no-explicit-any': ["off"],
			indent: ["warn", "tab"],
			'no-unused-vars': ["warn"],
			'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
		},
	});
