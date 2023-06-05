module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{css,tsx,ts,svg}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};