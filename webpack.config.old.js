var path = require("path");
var I18nPlugin = require("i18n-webpack-plugin");
var StringReplacePlugin = require("string-replace-webpack-plugin");
var languages = {
    "en": require("./en.json"),
    "de": require("./de.json")
}
var selectedLanguage = languages["de"];
console.log(selectedLanguage);
module.exports = {
    entry: {
        // index: "./index.html",
        main: "./main.js"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/bundled",
        publicPath: "/bundled/"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "file?name=[path][name].[ext]" }, // copies the files over
            // configure replacements for file patterns
            {
                test: /\.html$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: /<!-- @lang (\w*?) -->/ig,
                            replacement: function (match, p1, offset, string) {
                                return selectedLanguage[p1];
                                // return __(p1);
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        // an instance of the plugin must be present
        new StringReplacePlugin(),
        new I18nPlugin(selectedLanguage)
    ]
}