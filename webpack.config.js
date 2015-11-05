module.export = {
	entry: 'webp.js',
	output: {
		path: './app/js',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			}
		]
	}
}