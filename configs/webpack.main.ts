import path from "path";

import webpack from "webpack";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from "terser-webpack-plugin";

console.log("NODE_ENV:", process.env.NODE_ENV);
const isProd: boolean = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
	mode: isProd ? "production" : "development",
	target: "electron-main",
	devtool: "cheap-source-map",
	node: false,
	entry: { main: path.join(__dirname, "../src/main/main.ts") },
	output: {
		path: path.join(__dirname, "../dist/app"),
		libraryTarget: 'commonjs2',
		filename: "main.js"
	},
	resolve: {
		extensions: [".js", ".json", ".node", ".ts"],
	},
	optimization: {
		minimize: isProd ? true : false,
		minimizer: [new TerserPlugin({
			parallel: true,
			sourceMap: true,
			cache: true,
		})],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, "../src/main")],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: [path.resolve(__dirname, "../src/main")],
				exclude: /node_modules/
			},
			{
				test: /\.node$/,
				use: 'node-loader'
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: path.join(__dirname, '../src/main/preload.js'),
			to: "preload.js",
		}])
	]
};

export default config;
