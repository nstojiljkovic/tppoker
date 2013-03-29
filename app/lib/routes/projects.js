TPPoker.Application.ProjectsRoute = Ember.Route.extend({
	model: function(params) {
		var app = TPPoker.Application.state.get('app');
		if (app==null || !app.get('loaded')) {
			return null;
		} else {
			var ProjectsModel = Ember.Object.extend({
				projects: TPPoker.Application.Project.find(),
				isLoaded: function() {
					var projects = this.get('projects');
					var isLoaded = projects.filterProperty('isLoaded', true).get('length') > 0;
					return isLoaded;
				}.property('projects.@each.isLoaded'),
				isNotLoaded: function() {
					return !this.get('isLoaded');
				}.property('isLoaded')
			});
			return ProjectsModel.create({});
		}
	},
	setupController: function(controller, model) {
		controller.set('content', model);
	},
	redirect: function() {
		var app = TPPoker.Application.state.get('app');
		if (app==null || !app.get('loaded')) {
			this.transitionTo('app.new');
		}
	}
});