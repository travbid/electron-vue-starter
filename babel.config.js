module.exports = {
	presets: [
		["@babel/preset-env", {
			"targets": {
				"esmodules": true
			}
		}],
		"@babel/preset-typescript",
		"@vue/cli-plugin-babel/preset"
	]
}
