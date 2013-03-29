require('ember-tppoker/core');
require('ember-tppoker/routes/app');
require('ember-tppoker/routes/index');
require('ember-tppoker/routes/projects');

TPPoker.Application.Router.map(function() {
	this.route("app", { path: "/app" });
	this.route("projects", { path: "/projects" });
	this.resource('app', { path: '/app' }, function() {
		this.route('new');
	});
});