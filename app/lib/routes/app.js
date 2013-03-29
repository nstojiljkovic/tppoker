TPPoker.Application.AppNewRoute = Ember.Route.extend({
	redirect: function() {
		var app = TPPoker.Application.state.get('app');
		if (app!=null && app.get('loaded')) {
			this.transitionTo('projects');
		}
	},
	model: function(params) {
		if (!TPPoker.Application.state.get('app')) {
			var app = TPPoker.Application.Application.create({url: ''});
			TPPoker.Application.state.set('app', app);
		}
		return TPPoker.Application.state.get('app');
	},
	setupController: function(controller, model) {
		controller.set('content', model);
	}
});