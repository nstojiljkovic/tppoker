TPPoker.Application.IndexRoute = Ember.Route.extend({
	redirect: function() {
		this.transitionTo('app.new');
	},
	setupController: function(controller) {
		// Set the IndexController's `title`
		controller.set('title', "My App");
	}
});