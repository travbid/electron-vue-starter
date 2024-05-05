// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

const isProd = (process.env.NODE_ENV === "production");

module.exports = {
	configureWebpack:{
		entry: { app: path.join(__dirname, "src/renderer/main.ts") },
		devtool: "cheap-source-map",
		resolve: {
			alias: {
				"@": path.join(__dirname, "src/renderer"),
				'vue$': 'vue/dist/vue.runtime.esm-bundler.js',
			},
			extensions: [".js", ".json", ".ts", ".vue"],
		},
		target: isProd ? 'electron-renderer' : 'web',
		optimization: {
			minimize: isProd ? true : false,
			splitChunks: false,
		},
		// plugins: [
		// 	new ScriptExtHtmlWebpackPlugin({
		// 		module: [ /\.js$/]
		// 	})
		// ]
	},
	publicPath: "./"
}
