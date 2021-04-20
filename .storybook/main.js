module.exports = {
	"stories": [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		"@storybook/addon-links",
		{
			name: "@storybook/addon-essentials",
			options: {
				actions: false,
			}
		},
		"@storybook/preset-create-react-app"
	]
};