export default (config, env, helpers) => {
	const htmlPlug = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0];
	if (htmlPlug) {
		const { plugin } = htmlPlug;
		plugin.options.title = '测试ssr';
	}
};