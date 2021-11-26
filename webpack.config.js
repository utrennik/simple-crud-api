const path = require('path');

module.exports = () => ({
	mode: 'production',

	target: 'node',

	entry: './src/index.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},

	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.tsx?$/,
	// 			use: 'babel-loader',
	// 			exclude: /node_modules/,
	// 		},

	// 	],
	// },

	resolve: {
		extensions: ['.js', '.json'],
	},

	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
});
