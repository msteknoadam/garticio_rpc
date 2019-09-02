const path = require("path");

module.exports = {
	entry: {
		"./assets/browser": path.resolve(__dirname, "assets", "browser.js")
	},
	mode: "production",
	resolve: {
		extensions: [".js"]
	},
	output: {
		filename: "[name].webpack.js",
		path: path.resolve(__dirname)
	}
};
