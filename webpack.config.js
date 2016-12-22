var path = require("path");
var I18nPlugin = require("i18n-webpack-plugin");
var languages = {
    "en": require("./en.json"),
    "de": require("./de.json")
}
module.exports = Object.keys(languages).map(function(language) {
	return {
		name: language,
		entry: "./main",
		output: {
			path: path.join(__dirname, "js"),
			filename: language + ".bundle.js"
		},
		plugins: [
			new I18nPlugin(
				languages[language]
			)
		]
	};
});