require('ember-tppoker/core');
require('ember-tppoker/routes/app');
require('ember-tppoker/routes/index');
require('ember-tppoker/routes/wizard');

TPPoker.Application.Router.map(function() {
	this.route("app", { path: "/app" });
	this.resource('app', { path: '/app' }, function() {
		this.route('new');
	});
	this.route("wizard", { path: "/wizard" });
	this.resource('wizard', { path: '/wizard' }, function() {
		this.route('project');
		this.route('release');
		this.route('iteration');
		this.route('query');
	});
});