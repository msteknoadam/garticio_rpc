const path = require("path");

module.exports = {
	entry: {
		"./main": path.resolve(__dirname, "main.js")
	},
	mode: "production",
	resolve: {
		extensions: [".js"]
	},
	target: "electron-main",
	output: {
		filename: "[name].webpack.js",
		path: path.resolve(__dirname)
	}
};
